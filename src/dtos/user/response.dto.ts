import { UserRole } from '../../types/user'

export interface UserSuccess {
  id: string
  firstName: string
  lastName: string
  patronymic?: string
  email: string
  dob: Date
  role: UserRole
  isActive: boolean
}

export interface BlockUserHandlerSuccess {
  id: string
  isActive: boolean
}
