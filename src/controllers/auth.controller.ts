import { Request, Response } from 'express'

import * as userService from '../services/user.service'
import { signToken } from '../utils/jwt'
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse
} from '../dtos/auth'
import { toUserResponse } from '../utils/transformUser'
import { loginSchema, registerSchema } from '../schemas/auth.schema'

export async function register(
  req: Request<{}, RegisterResponse, RegisterRequest>,
  res: Response<RegisterResponse>
) {
  const parsed = registerSchema.safeParse(req.body)
  if (!parsed.success)
    return res.status(400).json({ errors: parsed.error.format() })

  const existing = await userService.findUserByEmail(parsed.data.email)
  if (existing)
    return res.status(409).json({ message: 'Email already registered' })

  const user = await userService.createUser(parsed.data)

  const token = signToken({ userId: user._id.toString(), role: user.role })

  return res.status(201).json({
    user: toUserResponse(user),
    token
  })
}

export async function login(
  req: Request<{}, LoginResponse, LoginRequest>,
  res: Response<LoginResponse>
) {
  const parsed = loginSchema.safeParse(req.body)

  if (!parsed.success)
    return res.status(400).json({ errors: parsed.error.format() })

  const user = await userService.findUserByEmail(parsed.data.email)
  if (!user) return res.status(401).json({ message: 'Invalid credentials' })

  const valid = await userService.validatePassword(user, parsed.data.password)
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' })

  if (!user.isActive)
    return res.status(403).json({ message: 'User is blocked' })

  const token = signToken({ userId: user._id.toString(), role: user.role })

  return res.json({ token })
}
