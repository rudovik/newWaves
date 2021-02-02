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
  removeFromCart,
  successBuy,
  updateProfile,
  downloadFile,
  resetUser,
  resetPassword,
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
router.get('/removeFromCart', auth, removeFromCart)
router.post('/successBuy', auth, successBuy)
router.post('/update_profile', auth, updateProfile)
router.get('/download/:id', auth, admin, downloadFile)
router.post('/reset_user', resetUser)
router.post('/reset_password', resetPassword)

export default router
