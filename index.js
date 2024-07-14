import Express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import serveStatic from 'serve-static'

import { authRouter, uploadRouter, serveRouter } from './routes/index.js'
import {
  authMiddleware,
  pathAdderMiddleware,
} from './common/middleware/index.js'
import Seeder from './common/seed/index.js'
import templateEngine from './common/template/engine.js'

await init()

const app = Express()
const PORT = process.env.PORT ?? 8000
const FE_DIR = `${process.cwd()}/views/dist`

app.use(
  cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: '*',
  })
)

if (process.env.DEV_ENV) {
  app.use(morgan('dev'))
}

// for rendering files preview
app.engine('html', templateEngine())
app.set('views', FE_DIR)
app.set('view engine', 'html')
app.use('/', serveRouter)
app.use(
  serveStatic(FE_DIR, {
    index: false,
    setHeaders: (res, path) => {
      if (path.endsWith('.js')) {
        res.setHeader('Content-Type', 'text/javascript')
      } else if (path.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css')
      }
    },
  })
)

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
