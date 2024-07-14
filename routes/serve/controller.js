import { PAGE_TYPES } from '../../common/constants/frontend.js'

export async function serveFrontend(req, res) {
  const [subdomain, domain] = req.hostname.includes('.')
    ? req.hostname.split('.')
    : [null, req.hostname]

  if (!subdomain) {
    return res.render('index', {
      pageType: PAGE_TYPES[404],
    })
  }

  res.render('index', {
    pageType: PAGE_TYPES.VIEWER,
  })
}
