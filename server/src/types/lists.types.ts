import { z } from 'zod'
import { createListSchema, updateListSchema } from '@/schemas/lists.schema'

export type CreateListInput = z.infer<typeof createListSchema>
export type UpdateListInput = z.infer<typeof updateListSchema>