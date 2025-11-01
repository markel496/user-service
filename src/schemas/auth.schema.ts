import { z } from 'zod'
import { dobSchema } from './common/dob.schema'
import { nameSchema } from './common/name.schema'
import { patronymicSchema } from './common/patronymic.schema'
import { UserRole } from '../types/user'

export const registerSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  patronymic: patronymicSchema,
  dob: dobSchema,
  email: z.string().email(),
  password: z.string().min(6),
  role: z.nativeEnum(UserRole).optional()
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})
