import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// @description   Register a new user
// @route         POST /api/register
// @access        Public
const registerUser = asyncHandler(async (req, res) => {
  res.send(200)
})

export { registerUser }
