import { Router } from 'express'

import { GoogleOauthProvider } from './providers/index.js'

const router = Router()
const googleOauthProvider = new GoogleOauthProvider()

// For Google OAuth
router.get(
  '/google/url',
  googleOauthProvider.getUrl.bind(googleOauthProvider)
)
router.post(
  '/google/callback',
  googleOauthProvider.handleCallback.bind(googleOauthProvider)
)

export default router
