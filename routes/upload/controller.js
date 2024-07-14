import { ShareableFileType, Status } from '@prisma/client'
import Joi from 'joi'
import unzipper from 'unzipper'

import { storageBucket } from '../../common/storage/index.js'
import { Shareable } from '../../common/db/app/index.js'
import { randomSlugGenerator } from '../../common/utils/index.js'

const PUBLIC_BUCKET_URL = 'https://cdn.hitenvats.one/eruva',
  DEFAULT_DOMAIN = 'localhost'

export async function uploadFile(req, res) {
  const schema = Joi.object({
    fileType: Joi.string()
      .valid(...Object.values(ShareableFileType))
      .required(),
    file: Joi.any().required(),
    domain: Joi.string().custom((value, helpers) => {
      if (!req.user.plan.customDomain) {
        return helpers.message('custom domain not allowed in this plan')
      }
      return true
    }),
  })

  const { error, value } = schema.validate({
    ...req.body,
    file: req.file,
  })

  if (error) {
    return res.status(400).json({ error: error.message, ok: false })
  }

  const { fileType, file, domain } = value,
    slug = await randomSlugGenerator(),
    user = req.user,
    path = `${user.id}_${user.email}/${slug}/${file.originalname}`,
    domainConfig = {
      subDomain: slug,
      domainName: process.env.DOMAIN ?? DEFAULT_DOMAIN,
    },
    plan = user.plan.data
  let sizeUsedSoFar = 0,
    createdShareable

  const activeShareables = await Shareable.count({
    userId: req.user.id,
    NOT: {
      status: Status.DELETED,
    },
  })

  if (activeShareables >= plan.activeShareables) {
    return res.status(400).json({
      error: 'You have reached the maximum limit of active shareables',
      ok: false,
    })
  }

  if (plan.customDomain) {
    domainConfig.domainName = domain ?? domainConfig.domainName
  }

  const shareables = await Shareable.list(
    {
      userId: req.user.id,
      NOT: {
        status: Status.DELETED,
      },
    },
    {
      select: {
        data: true,
      },
    }
  )

  shareables.forEach(({ data }, index) => {
    sizeUsedSoFar += data?.size ?? 0
  })

  sizeUsedSoFar += file.size / 1024 / 1024 // convert to MB

  if (sizeUsedSoFar > plan.storageLimit) {
    return res.status(400).json({
      error: 'You have reached the maximum storage limit',
      ok: false,
    })
  }

  try {
    const uploadInstance = storageBucket.uploadFile(path, file.buffer)
    let publicPath = `${PUBLIC_BUCKET_URL}/${path}`
    await uploadInstance.done()
    createdShareable = await Shareable.create({
      userId: user.id,
      bucketLink: publicPath,
      fileType,
      slug,
      domain: {
        create: domainConfig,
      },
      data: {
        size: file.size / 1024 / 1024,
      },
    })

    if (fileType === ShareableFileType.ZIP) {
      const zip = (await storageBucket.getObject(path)).Body.pipe(
        unzipper.Parse({ forceStream: true })
      )
      const promises = []
      for await (const e of zip) {
        const entry = e
        const fileName = entry.path
        const type = entry.type
        if (type === 'File') {
          const path = `${user.id}_${user.email}/${slug}/extracted/${fileName}`
          promises.push(storageBucket.uploadFile(path, entry).done())
        } else {
          entry.autodrain()
        }
      }
      await Promise.all(promises)
    }

    return res.json({
      ok: true,
      shareables: {
        id: createdShareable.id,
        fileType: createdShareable.fileType,
        slug: createdShareable.slug,
        domain: `${domainConfig.subDomain}.${domainConfig.domainName}`,
        data: {
          size: createdShareable.data.size.toFixed(2) + ' mB',
        },
        status: createdShareable.status,
      },
    })
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message })
  }
}

export async function listUploads(req, res) {
  const shareables = await Shareable.list(
    {
      userId: req.user.id,
      NOT: {
        status: Status.DELETED,
      },
    },
    {
      include: {
        domain: true,
      },
    }
  )
  return res.json({
    ok: true,
    shareables: shareables.map((s) => {
      return {
        id: s.id,
        fileType: s.fileType,
        slug: s.slug,
        domain: `https://${s.domain.subDomain}.${s.domain.domainName}`,
        data: {
          size: s.data.size.toFixed(2) + ' mB',
        },
        status: s.status,
      }
    }),
  })
}

export async function updateShareable(req, res) {
  const schema = Joi.object({
    domain: Joi.string().custom((value, helpers) => {
      if (!req.user.plan.customDomain) {
        return helpers.message('custom domain not allowed in this plan')
      }
      return true
    }),
    slug: Joi.string(),
    file: Joi.any(),
    status: Joi.string().valid(...Object.values(Status)),
    fileType: Joi.string().when('file', {
      is: Joi.exist(),
      then: Joi.string().valid(...Object.values(ShareableFileType)),
      otherwise: Joi.forbidden(),
    }),
  })

  let shareableId
  try {
    shareableId = parseInt(req.params.id)
  } catch (e) {
    return res.status(400).json({ ok: false, error: 'Invalid shareable id' })
  }

  const { error, value } = schema.validate({
    ...req.body,
    file: req.file,
  })

  if (error) {
    return res.status(400).json({ ok: false, error: error.message })
  }

  const { domain, slug, file, status, fileType } = value,
    user = req.user,
    isSlugAvailable =
      !slug ||
      (await Shareable.count({
        userId: user.id,
        slug,
      })) === 0,
    plan = user.plan.data,
    shareable = await Shareable.findOne({
      id: shareableId,
      userId: user.id,
      NOT: {
        status: Status.DELETED,
      },
    })

  if (!shareable) {
    return res.status(404).json({ ok: false, error: 'Shareable not found' })
  }

  if (!isSlugAvailable) {
    return res.status(400).json({ ok: false, error: 'Slug already exists' })
  }

  const updatedData = {
    status,
    fileType,
    slug: slug ?? shareable.slug,
  }

  if (file) {
    let path = `${user.id}_${user.email}/${updatedData.slug}/${file.originalname}`
    const uploadInstance = storageBucket.uploadFile(path, file.buffer)
    await uploadInstance.done()

    if (fileType === ShareableFileType.ZIP) {
      const zip = (await storageBucket.getObject(path)).Body.pipe(
        unzipper.Parse({ forceStream: true })
      )
      const promises = []
      for await (const e of zip) {
        const entry = e
        const fileName = entry.path
        const type = entry.type
        if (type === 'File') {
          const path = `${user.id}_${user.email}/${slug}/extracted/${fileName}`
          promises.push(storageBucket.uploadFile(path, entry).done())
        } else {
          entry.autodrain()
        }
      }
      await Promise.all(promises)
    }

    updatedData.bucketLink = `${PUBLIC_BUCKET_URL}/${path}`
    updatedData.data = {
      size: file.size / 1024 / 1024,
    }
  }

  if (domain) {
    const domainConfig = {
      subDomain: slug,
      domainName: process.env.DOMAIN ?? DEFAULT_DOMAIN,
    }

    if (plan.customDomain) {
      domainConfig.domainName = domain
    }

    updatedData.domain = {
      update: domainConfig,
    }
  }

  const updateShareable = await Shareable.update(
    {
      id: shareableId,
    },
    updatedData,
    {
      include: {
        domain: true,
      },
    }
  )

  return res.json({
    ok: true,
    shareables: {
      id: updateShareable.id,
      fileType: updateShareable.fileType,
      slug: updateShareable.slug,
      domain: `https://${updateShareable.domain.subDomain}.${updateShareable.domain.domainName}`,
      data: {
        size: updateShareable.data.size.toFixed(2) + ' mB',
      },
      status: updateShareable.status,
    },
  })
}
