import express from 'express'
const router = express.Router()
import { auth, admin } from '../middlewares/authMiddlewares.js'
import {
  getSiteInfo,
  updateSiteInfo,
} from '../controllers/siteInfoController.js'

router.get('/site_data', auth, admin, getSiteInfo)
router.post('/site_data', auth, admin, updateSiteInfo)

export default router
