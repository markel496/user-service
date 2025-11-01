import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt'
import { UserRole } from '../types/user'
import { AuthRequest } from '../types/requests'

export function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  // Получаю токен, который был передан при регистрации/авторизации. Убираю слово "Bearer"(Insomnia)
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

  if (token) {
    try {
      req.auth = verifyToken(token)
      return next()
    } catch {
      return res.status(401).json({ message: 'Unauthorized' })
    }
  }
}

export function requireAdminOrSelf(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params

  if (!req.auth) return res.status(401).json({ message: 'Unauthorized' })

  if (req.auth.role === UserRole.ADMIN || req.auth.userId === id) return next()

  return res.status(403).json({ message: 'Forbidden' })
}

export function requireAdmin(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  if (req.auth?.role === UserRole.ADMIN) return next()
  return res.status(403).json({ message: 'Forbidden' })
}
