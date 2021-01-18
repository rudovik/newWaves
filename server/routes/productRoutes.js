import express from 'express'
const router = express.Router()
import { auth, admin } from '../middlewares/authMiddlewares.js'
import { addBrand, getBrands } from '../controllers/brandController.js'
import { addWood, getWoods } from '../controllers/woodController.js'
import {
  addProduct,
  getProductsByIds,
  getSortedProducts,
  getProductsToShop,
} from '../controllers/productController.js'

router.post('/wood', auth, admin, addWood)
router.post('/article', auth, admin, addProduct)
router.get('/articles_by_ids', getProductsByIds)
router.get('/articles', getSortedProducts)
router.get('/woods', getWoods)
router.post('/brand', auth, admin, addBrand)
router.get('/brands', getBrands)
router.post('/shop', getProductsToShop)

export default router
