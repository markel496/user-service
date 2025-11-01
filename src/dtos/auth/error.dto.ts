import type { ZodFormattedError } from 'zod'
import type { RegisterRequest, LoginRequest } from './request.dto'

export interface RegisterValidationError {
  errors: ZodFormattedError<RegisterRequest, string>
}

export interface LoginValidationError {
  errors: ZodFormattedError<LoginRequest, string>
}
