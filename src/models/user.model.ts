import mongoose, { Schema } from 'mongoose'
import { IUser, UserRole } from '../types/user'

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    patronymic: String,
    dob: { type: Date, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: UserRole, default: UserRole.USER },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
)

export const User = mongoose.model<IUser>('User', userSchema)
