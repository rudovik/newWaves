import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const auth = asyncHandler(async (req, res, next) => {
  let token

  if ((token = req.cookies.w_auth)) {
    try {
      const user = await User.findByToken(token)

      if (user) {
        req.token = token
        req.user = user
        next()
      } else {
        throw new Error()
      }
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  } else {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

export { auth }
