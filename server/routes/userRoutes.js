import express from 'express'
const router = express.Router()
import {
  registerUser,
  loginUser,
  authUser,
  logoutUser,
  uploadToCloudinary,
  deleteFromCloudinary,
  addToUserCart,
} from '../controllers/userController.js'
import { auth, admin } from '../middlewares/authMiddlewares.js'
import formidable from 'express-formidable'

router.get('/auth', auth, authUser)
router.get('/logout', auth, logoutUser)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/uploadimage', auth, admin, formidable(), uploadToCloudinary)
router.get('/removeimage', auth, admin, deleteFromCloudinary)
router.post('/addToCart', auth, addToUserCart)

export default router
