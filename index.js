import Express from 'express'
import morgan from 'morgan'
import { createEngine } from 'express-react-views'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'

import { authRouter, uploadRouter,serveRouter } from './routes/index.js'
import {
  authMiddleware,
  pathAdderMiddleware,
} from './common/middleware/index.js'
import Seeder from './common/seed/index.js'

await init()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = Express()
const PORT = process.env.PORT ?? 8000

app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  origin: '*',
}))

if (process.env.DEV_ENV) {
  app.use(morgan('dev'))
}

// for rendering JSX files
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jsx')
app.engine(
  'jsx',
  createEngine({
    doctype: '<!DOCTYPE html>', // change this if you want to use HTML 5
    beatify: true,
  })
)
app.use('/', serveRouter)

// to serve JSON based APIs
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
