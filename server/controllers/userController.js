import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Product from '../models/productModel.js'
import Payment from '../models/paymentModel.js'
import { v2 as cloudinary } from 'cloudinary'
import mongoose from 'mongoose'
import { sendEmail } from '../utils/mail/mail.js'

// @description   Register a new user
// @route         POST /api/users/register
// @access        Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name, lastname } = req.body

  const user = await User.create({
    email,
    password,
    name,
    lastname,
  })

  res.status(200).json({ registerSuccess: true })

  sendEmail({ to: email, name, token: null, type: 'welcome' })
})

// @description   Login a user
// @route         POST /api/users/login
// @access        Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    await user.generateToken(user._id)
    res
      .cookie('w_auth', user.token)
      .status(200)
      .json({
        loginSuccess: true,
        user: {
          isAdmin: user.role === 0 ? false : true,
          email: user.email,
          name: user.name,
          lastname: user.lastname,
          cart: user.cart,
          history: user.history,
        },
      })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @description   Logout a new user
// @route         POST /api/users/logout
// @access        Private
const logoutUser = asyncHandler(async (req, res) => {
  const user = await User.findOneAndUpdate({ _id: req.user._id }, { token: '' })

  if (user) {
    res.status(200).json({
      success: true,
    })
  } else {
    throw new Error("You cannot logout because you're not login")
  }
})

// @description   Auth a new user
// @route         POST /api/users/auth
// @access        Private
const authUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    user: {
      isAdmin: req.user.role === 0 ? false : true,
      isAuth: true,
      email: req.user.email,
      name: req.user.name,
      lastname: req.user.lastname,
      cart: req.user.cart,
      history: req.user.history,
    },
  })
})

const uploadToCloudinary = asyncHandler(async (req, res) => {
  const { public_id, url } = await cloudinary.uploader.upload(
    req.files.file.path,
    { public_id: `${Date.now()}`, resource_type: 'auto' }
  )

  res.status(200).send({
    public_id,
    url,
  })
})

const deleteFromCloudinary = asyncHandler(async (req, res) => {
  const image_id = req.query.public_id
  const response = await cloudinary.uploader.destroy(image_id)
  res.status(200).send('ok')
})

const addToUserCart = asyncHandler(async (req, res) => {
  let user = await User.findOne({ _id: req.user._id })
  let duplicate = false

  user.cart.forEach((item) => {
    if (item.id == req.query.productId) {
      duplicate = true
    }
  })

  // console.log(duplicate)

  if (duplicate) {
    user = await User.findOneAndUpdate(
      {
        _id: req.user._id,
        'cart.id': mongoose.Types.ObjectId(req.query.productId),
      },
      {
        $inc: { 'cart.$.quantity': 1 },
      },
      { new: true }
    )
  } else {
    user = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $push: {
          cart: {
            id: mongoose.Types.ObjectId(req.query.productId),
            quantity: 1,
            date: Date.now(),
          },
        },
      },
      { new: true }
    )
  }
  res.status(200).json(user.cart)
})

const removeFromCart = asyncHandler(async (req, res) => {
  const { cart } = await User.findOneAndUpdate(
    { _id: req.user._id },
    { $pull: { cart: { id: mongoose.Types.ObjectId(req.query._id) } } },
    { new: true }
  )

  const cartArray = cart.map((item) => {
    return mongoose.Types.ObjectId(item.id)
  })

  const cartDetails = await Product.find({ _id: { $in: cartArray } })
    .populate('brand')
    .populate('wood')
    .exec()

  res.status(200).json({
    cartDetails,
    cart,
  })
})

const successBuy = asyncHandler(async (req, res) => {
  const history = []
  const transactionData = {}

  // User history
  req.body.cartDetails.forEach((item) => {
    history.push({
      dateOfPurchase: Date.now(),
      name: item.name,
      id: item._id,
      price: item.price,
      brand: item.brand.name,
      quantity: item.quantity,
      paymentId: req.body.paymentData.id,
    })
  })

  // Payments dash
  transactionData.user = {
    id: req.user._id,
    name: req.user.name,
    lastname: req.user.lastname,
    email: req.user.email,
  }
  transactionData.data = req.body.paymentData
  transactionData.product = history

  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { history: history }, $set: { cart: [] } },
    { new: true }
  )

  const payment = new Payment(transactionData)
  await payment.save()

  const products = []
  payment.product.forEach(async (item) => {
    // products.push({id: item.id, quantity: item. quantity})
    await Product.updateOne(
      { _id: item.id },
      { $inc: { sold: item.quantity } },
      { new: false }
    )
  })
  res.status(200).json({
    success: true,
    cart: user.cart,
    cartDetails: [],
  })
})

const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: req.body },
    { new: true }
  )
  return res.status(200).send({
    success: true,
  })
})

export {
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
}
