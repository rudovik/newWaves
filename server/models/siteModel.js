import mongoose from 'mongoose'
const siteSchema = mongoose.Schema({
  featured: {
    required: true,
    type: Array,
    default: [],
  },
  siteInfo: {
    required: true,
    type: Array,
    default: [],
  },
})

const Site = mongoose.model('Site', siteSchema)

export default Site
