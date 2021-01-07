import asyncHandler from 'express-async-handler'
import Brand from '../models/brandModel.js'

// @description   Auth a new user
// @route         POST /api/products/brand
// @access        Private
const addBrand = asyncHandler(async (req, res) => {
  const brand = new Brand(req.body)

  await brand.save()

  res.status(200).json({
    success: true,
    brand,
  })
})

const getBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find({})

  res.status(200).json({ brands })
})

export { addBrand, getBrands }
