import { z } from 'zod'
import { createTaskSchema, getTasksQuerySchema, updateTaskSchema } from '@/schemas/tasks.schema'

export type CreateTaskInput = z.infer<typeof createTaskSchema>
export type GetTasksQueryInput = z.infer<typeof getTasksQuerySchema>
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>