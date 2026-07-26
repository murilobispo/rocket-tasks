import { Router } from 'express'
import { validate } from '@/middlewares/validate'
import { registerSchema, loginSchema } from '@/schemas/auth.schema'
import { register, login } from '@/controllers/auth.controller'

const router = Router()

router.post('/register', validate(registerSchema), register)
router.post('/login', validate(loginSchema), login)

export { router as authRoutes }