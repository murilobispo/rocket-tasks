import { Router } from 'express'
import { validate } from '../middlewares/validate'
import { registerSchema } from '../schemas/auth.schema'
import { register } from '../controllers/auth.controller'

const router = Router()

router.post('/register', validate(registerSchema), register)

export { router as authRoutes }