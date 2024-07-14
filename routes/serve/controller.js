import { ShareableFileType } from '@prisma/client'

import { PAGE_TYPES } from '../../common/constants/frontend.js'
import { Shareable } from '../../common/db/app/index.js'

export async function serveFrontend(req, res) {
  const [subdomain, domain] = req.hostname.includes('.')
    ? req.hostname.split('.')
    : [null, req.hostname]
  const data = {
    bucketLink: null,
    title: null,
    fileType: null,
    data: '{}',
    pageType: null,
  }
  const shareable = await Shareable.findOne({
    domain: {
      domainName: domain,
      subDomain: subdomain,
    },
  })

  if (!subdomain || !shareable) {
    data.pageType = PAGE_TYPES[404]
    return res.render('index', data)
  }

  data.title = shareable.slug
  data.fileType = shareable.fileType

  if (shareable.fileType === ShareableFileType.ZIP) {
    data.data = JSON.stringify({})
  } else {
    data.bucketLink = shareable.bucketLink
  }

  res.render('index', data)
}
