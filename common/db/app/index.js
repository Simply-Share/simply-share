import { PrismaClient } from '@prisma/client/edge'

const prismaConfig = {}

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

export * as User from './models/user.js'
export default prisma
