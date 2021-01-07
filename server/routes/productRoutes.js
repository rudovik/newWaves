import express from 'express'
const router = express.Router()
import { auth, admin } from '../middlewares/authMiddlewares.js'
import { addBrand, getBrands } from '../controllers/brandController.js'
import { addWood, getWoods } from '../controllers/woodController.js'
import { addProduct } from '../controllers/productController.js'

router.post('/wood', auth, admin, addWood)
router.post('/article', auth, admin, addProduct)
router.get('/woods', getWoods)
router.post('/brand', auth, admin, addBrand)
router.get('/brands', getBrands)

export default router
