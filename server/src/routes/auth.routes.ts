import { Router } from 'express'
import { validate } from '@/middlewares/validate'
import { authenticate } from '@/middlewares/authenticate'
import { registerSchema, loginSchema } from '@/schemas/auth.schema'
import { register, login, getMe } from '@/controllers/auth.controller'

const router = Router()

router.post('/register', validate(registerSchema), register)
router.post('/login', validate(loginSchema), login)
router.get('/me', authenticate, getMe)

export { router as authRoutes }