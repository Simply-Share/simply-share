import { ShareableFileType } from '@prisma/client'

import { PAGE_TYPES } from '../../common/constants/frontend.js'
import { Shareable, User } from '../../common/db/app/index.js'

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
  
  const dataToBeSent = {}

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

  const user = await User.findBySheareableId(shareable.id)
  dataToBeSent.banner = user.plan.data.simplyShareBanner

  data.title = shareable.slug
  data.fileType = shareable.fileType

  if (shareable.fileType === ShareableFileType.ZIP) {
    dataToBeSent.pageType = PAGE_TYPES.LIST
  } else {
    data.bucketLink = shareable.bucketLink
    dataToBeSent.pageType = PAGE_TYPES.VIEWER
  }

  data.data = encodeURIComponent(JSON.stringify(dataToBeSent))

  res.render('index', data)
}
