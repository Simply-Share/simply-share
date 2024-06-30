import { Router } from 'express'

import { GoogleOauthProvider } from './providers/index.js'

const authServiceRouter = Router()
const googleOauthProvider = new GoogleOauthProvider()

// For Google OAuth
authServiceRouter.get(
  '/google/url',
  googleOauthProvider.getUrl.bind(googleOauthProvider)
)
authServiceRouter.post(
  '/google/callback',
  googleOauthProvider.handleCallback.bind(googleOauthProvider)
)

export default authServiceRouter
