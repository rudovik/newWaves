import mongoose from 'mongoose'

const paymentSchema = mongoose.Schema({
  user: {
    type: Array,
    default: [],
  },
  data: {
    type: Array,
    default: [],
  },
  product: {
    type: Array,
    default: [],
  },
})

const Payment = mongoose.model('Payment', paymentSchema)

export default Payment
