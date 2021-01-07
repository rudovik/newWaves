import express from 'express'
const router = express.Router()
import {
  registerUser,
  loginUser,
  authUser,
  logoutUser,
} from '../controllers/userController.js'
import { auth } from '../middlewares/authMiddlewares.js'

router.get('/auth', auth, authUser)
router.get('/logout', auth, logoutUser)
router.post('/register', registerUser)
router.post('/login', loginUser)

export default router
