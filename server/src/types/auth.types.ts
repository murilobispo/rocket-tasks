import { z } from 'zod'
import { loginSchema, registerSchema} from '@/schemas/auth.schema'

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>