import jwt from 'jsonwebtoken'

import { User } from '../db/app/index.js'

export async function authMiddleware(req, res, next) {
  const token = (req.headers.authorization ?? '').split(' ')?.[1]

  if (!req.headers.authorization || !token) {
    return res.status(401).json({
      error: 'Unauthorized',
      code: req.pathCode,
    })
  }

  const { email } = jwt.verify(token, process.env.JWT_SECRET)
  const user = await User.findByEmail(email)
  if (!user) return next(new Error('Unauthorized'))
  req.user = user
  next()
}
