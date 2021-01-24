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
  } else if (type === 'single') {
    items = [mongoose.Types.ObjectId(req.query.id)]
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

const getProductsToShop = asyncHandler(async (req, res) => {
  const order = req.body.order || 'desc'
  const sortBy = req.body.sortBy || '_id'
  const limit = req.body.limit || 100
  const skip = parseInt(req.body.skip) || 0
  const findArgs = {}
  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === 'price') {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        }
      } else {
        findArgs[key] = req.body.filters[key]
      }
    }
  }

  findArgs['publish'] = true

  const products = await Product.find(findArgs)
    .populate('brand')
    .populate('wood')
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec()

  res.status(200).json({
    size: products.length,
    articles: products,
  })
})

export { addProduct, getProductsByIds, getSortedProducts, getProductsToShop }
