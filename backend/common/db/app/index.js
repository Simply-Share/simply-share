import { PrismaClient } from '@prisma/client'

import User from './models/user.js'
import Plan from './models/plan.js'
import UserPlan from './models/userPlan.js'
import Shareable from './models/shareable.js'

let prismaConfig = {}

if (process.env.DEV_ENV) {
  prismaConfig = {
    log: ['query', 'info', 'warn', 'error']
  }
  console.log('Prisma is running in development mode')
}

const prisma = new PrismaClient(prismaConfig)

export default prisma
export {
  User,
  Plan,
  UserPlan,
  Shareable
}
