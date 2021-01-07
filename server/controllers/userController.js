import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

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

  if (user) {
    res.status(200).json({ success: true })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @description   Login a user
// @route         POST /api/users/login
// @access        Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    await user.generateToken(user._id)
    res.cookie('w_auth', user.token).status(200).json({
      loginSuccess: true,
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
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    cart: req.user.cart,
    history: req.user.history,
  })
})

export { registerUser, loginUser, authUser, logoutUser }
