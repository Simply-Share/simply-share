import { PrismaClient } from '@prisma/client'

import User from './models/user.js'
import Plan from './models/plan.js'

let prismaConfig = {}

if (process.env.DEV_ENV) {
  prismaConfig = {
    log: [
      {
        emit: 'event',
        level: 'query',
      },
      {
        emit: 'event',
        level: 'info',
      },
      {
        emit: 'event',
        level: 'warn',
      },
      {
        emit: 'event',
        level: 'error',
      },
    ],
  }
}

const prisma = new PrismaClient(prismaConfig)

export default prisma
export {
  User,
  Plan
}
