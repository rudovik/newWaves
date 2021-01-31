import dotenv from 'dotenv'
import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import colors from 'colors'
import connectDB from './config/db.js'
import bodyParser from 'body-parser'
import { v2 as cloudinary } from 'cloudinary'

import { notFound, errorHandler } from './middlewares/errorMiddlewares.js'

import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import siteRoutes from './routes/siteRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import downloadRoutes from './routes/downloadRoutes.js'

dotenv.config()

connectDB()
cloudinary.config({
  cloud_name: `${process.env.CLOUD_NAME}`,
  api_key: `${process.env.CLOUD_API_KEY}`,
  api_secret: `${process.env.CLOUD_API_SECRET}`,
})

const app = express()
const PORT = process.env.PORT || 5000

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/site', siteRoutes)
app.use('/api/users/uploadfile', uploadRoutes)
app.use('/api/users/admin_files', downloadRoutes)
app.use('*', (req, res) => {
  res.status(200).json({ message: 'Hello!' })
})

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`.yellow.bold)
})
