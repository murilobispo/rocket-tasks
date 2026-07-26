import { Router } from 'express'
import { authenticate } from '@/middlewares/authenticate'
import { getMe, deleteMe, updateMe, updatePassword} from '@/controllers/users.controller'
import { validate } from '@/middlewares/validate'
import { updateMeSchema, updatePasswordSchema } from '@/schemas/users.schema'

const router = Router()

router.get('/me', authenticate, getMe)
router.patch('/me', authenticate, validate(updateMeSchema), updateMe)
router.patch('/me/password', authenticate, validate(updatePasswordSchema), updatePassword)
router.delete('/me', authenticate, deleteMe)

export { router as usersRoutes }