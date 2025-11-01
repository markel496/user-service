import jwt from 'jsonwebtoken'
import { UserRole } from '../types/user'

const JWT_SECRET = process.env.JWT_SECRET ?? 'change-me'

export type TokenPayload = {
  userId: string
  role: UserRole
}

export function signToken(payload: TokenPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, JWT_SECRET) as TokenPayload
}
