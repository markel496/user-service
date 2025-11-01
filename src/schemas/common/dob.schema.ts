import { z } from 'zod'

const MIN_AGE = 14

export const dobSchema = z.string().refine((value) => {
  const date = new Date(value)
  if (isNaN(date.getTime())) return false // некорректная дата
  if (date > new Date()) return false // не может быть в будущем

  const today = new Date()
  let age = today.getFullYear() - date.getFullYear()
  const m = today.getMonth() - date.getMonth()

  if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
    age--
  }

  return age >= MIN_AGE
}, `Возраст должен быть не меньше ${MIN_AGE} лет`)
