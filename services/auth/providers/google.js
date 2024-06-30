import Joi from 'joi'
import jwt from 'jsonwebtoken'

class GoogleOauthProvider {
  constructor() {
    this.SCOPES = [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ]
    this.authUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
    this.config = {
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: process.env.GOOGLE_REDIRECT_URL,
      scope: this.SCOPES.join(' '),
      prompt: 'consent',
      response_type: 'code',
    }
  }

  getUrl(req, res) {
    const params = new URLSearchParams(this.config)
    const url = `${this.authUrl}?${params.toString()}`
    return res.json({
      ok: true,
      url,
    })
  }

  async handleCallback(req, res) {
    const schema = Joi.object({
      token: Joi.string().required(),
    })

    const { error, value } = schema.validate(req.body)

    if (error) {
      return res.status(400).json({
        ok: false,
        message: error.message,
        path: req.pathCode,
      })
    }

    const { token } = value
    const data = jwt.decode(token)
    
    console.log('data', data)

    return res.json({
      ok: true,
    })
  }
}

export default GoogleOauthProvider
