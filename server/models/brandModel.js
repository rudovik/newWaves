import mongoose from 'mongoose'

const brandSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100,
  },
})

const Brand = mongoose.model('Brand', brandSchema)

export default Brand
