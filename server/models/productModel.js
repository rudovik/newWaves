import mongoose from 'mongoose'

const productSchema = mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      unique: true,
      maxlength: 100,
    },
    description: {
      required: true,
      type: String,
      maxlength: 100,
    },
    price: {
      required: true,
      type: Number,
      maxlegnth: 255,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand',
    },
    shipping: {
      required: true,
      type: Boolean,
    },
    available: {
      required: true,
      type: Boolean,
    },
    wood: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Wood',
    },
    frets: {
      required: true,
      type: Number,
    },
    sold: {
      type: Number,
      maxlength: 100,
      default: 0,
    },
    publish: {
      required: true,
      type: Boolean,
    },
    images: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
)

const Product = mongoose.model('Product', productSchema)

export default Product
