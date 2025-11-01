import { z } from 'zod'
import { nameSchema } from './name.schema'

const emptyStringToUndefined = (value: unknown) => {
  if (typeof value === 'string') {
    const s = value.trim()
    return s === '' ? undefined : s
  }
  return value
}

export const patronymicSchema = z.preprocess(
  emptyStringToUndefined,
  nameSchema.optional()
)
