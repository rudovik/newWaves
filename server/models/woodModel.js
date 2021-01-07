import mongoose from 'mongoose'

const woodSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100,
  },
})

const Wood = mongoose.model('Wood', woodSchema)

export default Wood
