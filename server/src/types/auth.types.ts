import { z } from 'zod'
import { registerSchema} from '../schemas/auth.schema'

export type RegisterInput = z.infer<typeof registerSchema>
