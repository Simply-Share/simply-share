import Joi from 'joi'
import jwt from 'jsonwebtoken'
import { OauthProvider } from '@prisma/client'

import { User, Plan, UserPlan } from '../../../common/db/app/index.js'

const FREE_PLAN_SLUG = 'free'

class GoogleOauthProvider {
  #SCOPES = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ]
  #authUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
  #callbackUrl = 'https://oauth2.googleapis.com/token'
  #userInfoUrl = 'https://www.googleapis.com/oauth2/v3/userinfo'
  #config = {
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.GOOGLE_REDIRECT_URL,
    scope: this.#SCOPES.join(' '),
    prompt: 'consent',
    response_type: 'code',
  }

  getUrl(req, res) {
    const params = new URLSearchParams(this.#config)
    const url = `${this.#authUrl}?${params.toString()}`
    return res.json({
      ok: true,
      url,
    })
  }

  async handleCallback(req, res) {
    const schema = Joi.object({
      code: Joi.string().required(),
    })

    const { error, value } = schema.validate(req.body)

    if (error) {
      return res.status(400).json({
        ok: false,
        message: error.message,
        path: req.pathCode,
      })
    }

    const { code } = value

    try {
      const googleCallbackResponse = await fetch(this.#callbackUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          code,
          client_id: this.#config.client_id,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          redirect_uri: this.#config.redirect_uri,
          grant_type: 'authorization_code',
        }),
      })

      const data = await googleCallbackResponse.json()
      const { access_token: accessToken } = data

      const profileRes = await fetch(this.#userInfoUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      const profile = await profileRes.json()

      if (!profile || !accessToken) {
        return res.status(400).json({
          ok: false,
          message: 'Invalid access token or profile',
        })
      }

      const { email } = profile

      let user = await User.findByEmail(email)
      if (!user) {
        user = await this.#handleNewUser(profile)
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          provider: user.provider,
        },
        process.env.JWT_SECRET
      )

      return res.json({
        ok: true,
        token,
        profile: {
          email: user.email,
          name: user.name,
          picture: user.picture,
        },
      })
    } catch (error) {
      return res.status(400).json({
        ok: false,
        message: error.message,
      })
    }
  }

  async #handleNewUser(profile) {
    const freePlan = await Plan.find({
      slug: FREE_PLAN_SLUG,
    })
    let user = await User.create({
      email: profile.email,
      name: profile.name,
      oauthProvider: OauthProvider.GOOGLE,
      data: profile,
    })
    let userPlan = await UserPlan.create({
      userId: user.id,
      planId: freePlan.id,
      data: freePlan.data,
    })
    await User.update(
      {
        email: user.email,
      },
      {
        plan: userPlan,
      }
    )
    return user
  }
}

export default GoogleOauthProvider
