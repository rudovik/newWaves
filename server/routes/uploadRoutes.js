import express from 'express'
import path from 'path'
import multer from 'multer'
import { auth, admin } from '../middlewares/authMiddlewares.js'
const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`)
  },
  fileFilter: (req, res, cb) => {
    const fileTypes = /jpg|jpeg|png/
    const extIsValid = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    )
    const mimeTypeIsValid = fileTypes.test(file.mimetype)
    if (extIsValid && mimeTypeIsValid) {
      cb(null, true)
    } else {
      cb('Only images are accepted.')
    }
  },
})
const upload = multer({ storage }).single('file')

router.post('/', auth, admin, upload, (req, res) => {
  res.json({
    path: `/${req.file.path}`,
    success: true,
    filename: req.file.filename,
  })
})

export default router
