import { IUser } from '../types/user'

export function toUserResponse(user: IUser) {
  return {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    patronymic: user.patronymic,
    email: user.email,
    dob: user.dob,
    role: user.role,
    isActive: user.isActive
  }
}
