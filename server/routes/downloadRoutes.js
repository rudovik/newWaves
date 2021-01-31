import express from 'express'
import { auth, admin } from '../middlewares/authMiddlewares.js'
import { getFiles } from '../controllers/downloadController.js'
const router = express.Router()

router.get('/', auth, admin, getFiles)

export default router
