import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const addProduct = asyncHandler(async (req, res) => {
  const product = new Product(req.body)

  await product.save()

  res.status(200).json({
    success: true,
    product,
  })
})

export { addProduct }
