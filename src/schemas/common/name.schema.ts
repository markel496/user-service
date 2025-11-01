import { z } from 'zod'

const MIN = 2
const MAX = 50

export const nameSchema = z
  .string()
  .transform((value) => value.replace(/\s{2,}/g, ' ').trim()) // удаляет лишние пробелы
  .pipe(
    z
      .string()
      .min(MIN, `min ${MIN} characters`)
      .max(MAX, `max ${MAX} characters`)
      .regex(/^[A-Za-zА-ЯЁа-яё\- ]+$/, 'Only letters, spaces and hyphens')
  )
