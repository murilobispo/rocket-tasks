import { z } from 'zod'

export const createListSchema = z.object({
	title: z.string().trim().min(1).max(100),
	description: z.string().trim().max(255).optional(),
	color: z.string().startsWith('#').length(7).toLowerCase().regex(/^#[0-9a-f]{6}$/).optional()
})
const { title, description, color } = createListSchema.shape

export const updateListSchema = z.object({
	title: title.optional(),
	description,
	color
})