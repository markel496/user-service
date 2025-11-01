import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRouter from './routes/auth.routes'
import userRouter from './routes/user.routes'
import { errorHandler } from './middlewares/error.middleware'

dotenv.config()

const app = express()
app.use(express.json())

app.use('/auth', authRouter)
app.use('/users', userRouter)

app.use(errorHandler)

const MONGO_URI =
  process.env.MONGO_URI ||
  'mongodb+srv://jonysmoker:8QI7zdvHRk1Eb2r1@cluster0.kzzzsgv.mongodb.net/user_service?retryWrites=true&w=majority&appName=Cluster0'

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err))

export default app
