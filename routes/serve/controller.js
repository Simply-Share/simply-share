import { PAGE_TYPES } from '../../common/constants/frontend.js'

export async function serveFrontend(req, res) {
  const [subdomain, domain] = req.hostname.includes('.')
    ? req.hostname.split('.')
    : [null, req.hostname]
  const data = { bucketLink: 'https://hitenvats.one', title: 'New Title' }
  res.render('index', data)
}
