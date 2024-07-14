import { Router } from 'express'

import { serveFrontend } from './controller.js'

const router = Router()

router.get('/', serveFrontend)

export default router
