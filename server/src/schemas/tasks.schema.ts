import { z } from 'zod'

export const createTaskSchema = z.object({
  title: z.string().trim().min(1).max(100),
  dueDate: z.iso.datetime().optional(),
  listId: z.uuid().optional()
})

const { title, dueDate, listId } = createTaskSchema.shape

export const updateTaskSchema = z.object({
  title: title.optional(),
  completed: z.boolean().optional(),
  dueDate,
  listId: listId.nullable(),
}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided'
})

export const getTasksQuerySchema = z.object({
  completed: z.enum(['true', 'false']).transform(value => value === 'true').optional(),
  listId:  z.union([ z.uuid(), z.literal('null').transform(() => null)]).optional(),
  due: z.enum(['today', 'upcoming', 'past']).optional(),
  sortBy: z.enum(['createdAt', 'dueDate', 'title']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20)
})