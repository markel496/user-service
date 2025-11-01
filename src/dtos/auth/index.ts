// re-export всех типов для удобного импорта
export * from './request.dto'
export * from './response.dto'
export * from './error.dto'
export * from '../common/common.dto'

import type {
  RegisterSuccess,
  RegisterValidationError,
  LoginSuccess,
  LoginValidationError,
  GenericError
} from './'

export type RegisterResponse =
  | RegisterSuccess
  | RegisterValidationError
  | GenericError
export type LoginResponse = LoginSuccess | LoginValidationError | GenericError
