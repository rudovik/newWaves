import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import mongoose from 'mongoose'

const addProduct = asyncHandler(async (req, res) => {
  const product = new Product(req.body)

  await product.save()

  res.status(200).json({
    success: true,
    product,
  })
})

const getProductsByIds = asyncHandler(async (req, res) => {
  const type = req.query.type
  let items
  let ids

  if (type == 'array') {
    ids = req.query.id.split(',')
    items = ids.map((item) => {
      return mongoose.Types.ObjectId(item)
    })
  }

  const products = await Product.find({ _id: { $in: items } })
    .populate('brand')
    .populate('wood')
    .exec()

  res.status(200).json({
    products,
  })
})

// BY ARRIVAL
// /articles?sortBy=createdAt&order=desc&limit=4

// BY SELL
// /articles?sortBy=sold&order=desc&limit=100

const getSortedProducts = asyncHandler(async (req, res) => {
  const orderOptions = { asc: true, desc: true }
  const sortByOptions = { sold: true, createdAt: true, _id: true }

  let { order, sortBy, limit } = req.query

  !orderOptions[order] && (order = 'asc')
  !sortByOptions[sortBy] && (sortBy = '_id')
  limit = parseInt(limit)
  ;(isNaN(limit) || limit > 10 || limit === 0) && (limit = 10)

  const products = await Product.find({})
    .populate('brand')
    .populate('wood')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec()

  res.status(200).json({
    products,
  })
})

export { addProduct, getProductsByIds, getSortedProducts }
