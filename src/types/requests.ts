import { Request } from 'express'
import { UserRole } from './user'

export interface AuthRequest extends Request {
  auth?: {
    userId: string
    role: UserRole
  }
}
