import { z } from 'zod'
import { updateMeSchema, updatePasswordSchema } from '@/schemas/users.schema'

export type UpdateMeInput = z.infer<typeof updateMeSchema>
export type UpdatePasswordType = z.infer<typeof updatePasswordSchema>