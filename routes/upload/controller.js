import { ShareableFileType } from '@prisma/client'
import Joi from 'joi'
import { generateSlug } from 'random-word-slugs'
import unzipper from 'unzipper'

import { storageBucket } from '../../common/storage/index.js'
import { Shareable } from '../../common/db/app/index.js'

export async function uploadFile(req, res) {
  const schema = Joi.object({
    fileType: Joi.string()
      .valid(...Object.values(ShareableFileType))
      .required(),
    file: Joi.any().required(),
    domain: Joi.string().default(null),
  })

  const { error, value } = schema.validate({
    ...req.body,
    file: req.file,
  })

  if (error) {
    return res.status(400).json({ error: error.message })
  }

  // NOTE: check storage limit

  const { fileType, file, domain } = value
  const slug = await randomSlugGenerator()
  const user = req.user
  const path = `${user.id}_${user.email}/${slug}/${file.originalname}`
  const domainConfig = {
    subDomain: slug,
    domainName: process.env.DOMAIN ?? 'localhost:8000', 
  }

  const plan = user.plan.data

  if (plan.customDomain) {
    domainConfig.domainName = domain ?? domainConfig.domainName
  }

  try {
    const uploadInstance = storageBucket.uploadFile(path, file.buffer)
    let publicPath = `https://cdn.hitenvats.one/eruva/${path}`
    await uploadInstance.done()

    await Shareable.create({
      userId: user.id,
      bucketLink: publicPath,
      fileType,
      slug,
      domain: {
        create: domainConfig,
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

    return res.json({ ok: true, domain: `${domainConfig.subDomain}.${domainConfig.domainName}` })
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message })
  }
}

async function randomSlugGenerator() {
  const slug = generateSlug(3, {
    format: 'sentence',
  })
    .toLowerCase()
    .replace(/\s/g, '-')
  const isAreadyExist = false
  if (isAreadyExist) {
    return randomSlugGenerator()
  }
  return slug
}
