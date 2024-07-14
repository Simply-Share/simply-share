import { Router } from 'express'
import multer from 'multer'

import { uploadFile, listUploads, updateShareable } from './controller.js'

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
    const plan = req.user.plan.data
    if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
      return cb(new Error('Invalid file type'))
    }
    if (file.size > 1024 * 1024 * plan.storageLimit) {
      return cb(new Error('File size too large than in the plan'))
    }
    cb(null, true)
  },
})

const router = Router()

router.post('/', upload.single('file'), uploadFile)
router.get('/', listUploads)

router.post('/:id', upload.single('file'), updateShareable)

export default router
