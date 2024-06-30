import Express from 'express'

import authRouter from './services/auth/index.js'
import { pathAdderMiddleware } from './common/middleware/index.js'

const app = Express()
const PORT = process.env.PORT ?? 8000

app.get('/health', (req, res) => {
  res.json({
    ok: true,
    message: 'Service is healthy',
  })
})

app.use(Express.json())
app.use(pathAdderMiddleware)

app.use('/auth', authRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
