import Express from 'express'
import morgan from 'morgan'

import { authRouter, uploadRouter } from './routes/index.js'
import { authMiddleware, pathAdderMiddleware } from './common/middleware/index.js'
import Seeder from './common/seed/index.js'

await init()

const app = Express()
const PORT = process.env.PORT ?? 8000

if (process.env.DEV_ENV) {
  app.use(morgan('dev'))
}

app.get('/health', (req, res) => {
  res.json({
    ok: true,
    message: 'Server is healthy',
  })
})

app.use(Express.json())
app.use(pathAdderMiddleware)

app.use('/auth', authRouter)

app.use('/upload', authMiddleware, uploadRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

async function init() {
  await Seeder.Plan.seedPlansToDb()
}
