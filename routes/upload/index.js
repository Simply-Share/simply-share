import { Router } from 'express'
import multer from 'multer'

import { uploadFile } from './controller.js'
import { authMiddleware } from '../../common/middleware/auth.js'

const ALLOWED_FILE_TYPES = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'application/pdf',
  'text/html',
  'application/zip',
]

const upload = multer({
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
      return cb(new Error('Invalid file type'))
    }
    cb(null, true)
  },
})

const router = Router()

router.post('/', authMiddleware, upload.single('file'), uploadFile)

export default router
