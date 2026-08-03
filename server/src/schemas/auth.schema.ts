import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email().max(255),
  password: z.string().min(6).max(72)
})

export const loginSchema = z.object({
  email: z.email().max(255),
  password: z.string().min(1).max(72)
})