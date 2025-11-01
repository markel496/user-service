import { UserRole } from '../../types/user'

export interface RegisterSuccess {
  token: string
  user: {
    id: string
    firstName: string
    lastName: string
    patronymic?: string
    email: string
    dob: Date
    role: UserRole
    isActive: boolean
  }
}

export interface LoginSuccess {
  token: string
}
