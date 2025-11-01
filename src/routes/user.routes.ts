import { Router } from 'express'
import {
  getUserById,
  getAllUsers,
  blockUserHandler
} from '../controllers/user.controller'
import {
  authenticate,
  requireAdminOrSelf,
  requireAdmin
} from '../middlewares/auth.middleware'
import { asyncHandler } from '../utils/asyncHandler'

const router = Router()

router.get('/', authenticate, requireAdmin, asyncHandler(getAllUsers))
router.get('/:id', authenticate, requireAdminOrSelf, asyncHandler(getUserById))
router.patch(
  '/:id/block',
  authenticate,
  requireAdminOrSelf,
  asyncHandler(blockUserHandler)
)

export default router
