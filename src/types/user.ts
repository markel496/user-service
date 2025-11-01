import { IBaseDocument } from './base'

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export interface ICreateUser {
  firstName: string
  lastName: string
  patronymic?: string
  dob: string
  email: string
  password: string
  // Добавляю возможность зарегать админа в бд, чтобы можно было проверить эндпоинты из тз по разным сценариям
  role?: UserRole
}

export interface IUser
  extends Omit<ICreateUser, 'dob' | 'role'>,
    IBaseDocument {
  dob: Date
  role: UserRole
  isActive: boolean
}
