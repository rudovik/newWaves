import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { promisify } from 'util'
import jwt from 'jsonwebtoken'

const sign = promisify(jwt.sign)
const verify = promisify(jwt.verify)

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 100,
  },
  cart: {
    type: Array,
    default: [],
  },
  history: {
    type: Array,
    default: [],
  },
  role: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
  },
})

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.generateToken = async function () {
  const token = await sign(this._id.toHexString(), process.env.JWT_SECRET)
  this.token = token
  await this.save()
}

userSchema.statics.findByToken = async function (token) {
  const decoded = await verify(token, process.env.JWT_SECRET)
  const user = await this.findOne({ _id: decoded, token: token }).select(
    '-password'
  )
  return user
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
