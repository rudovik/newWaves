import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import morgan from 'morgan'
import colors from 'colors'
import connectDB from './config/db.js'

import userRoutes from './routes/userRoutes.js'

dotenv.config()
connectDB()
const app = express()
const PORT = process.env.PORT || 5000

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(express.json())
app.use(cookieParser())

app.use('/api/users', userRoutes)

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`.yellow.bold)
})
