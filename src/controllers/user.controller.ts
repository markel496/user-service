import { Response } from 'express'
import * as userService from '../services/user.service'
import { toUserResponse } from '../utils/transformUser'
import { AuthRequest } from '../types/requests'
import { BlockUserHandlerResponse, UserResponse } from '../dtos/user'

export async function getUserById(
  req: AuthRequest,
  res: Response<UserResponse>
) {
  const user = await userService.findUserById(req.params.id)
  if (!user) return res.status(404).json({ message: 'User not found' })

  return res.json(toUserResponse(user))
}

export async function getAllUsers(
  req: AuthRequest,
  res: Response<UserResponse[]>
) {
  const users = await userService.findAllUsers()

  return res.json(users.map((user) => toUserResponse(user)))
}

export async function blockUserHandler(
  req: AuthRequest,
  res: Response<BlockUserHandlerResponse>
) {
  const updated = await userService.blockUser(req.params.id)
  if (!updated) return res.status(404).json({ message: 'User not found' })

  return res.json({ id: updated._id, isActive: updated.isActive })
}
