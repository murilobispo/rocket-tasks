import { z } from 'zod'
import { registerSchema, loginSchema } from '@/schemas/auth.schema'

const { name, password: newPassword } = registerSchema.shape
const { password: currentPassword } = loginSchema.shape

export const updateMeSchema = z.object({
  name: name.optional(),
  avatarUrl: z.url().max(255).optional()
})

export const updatePasswordSchema = z.object({
  currentPassword,
  newPassword
})