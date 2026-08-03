import { Router } from 'express'
import { authenticate } from '@/middlewares/authenticate'
import { validate } from '@/middlewares/validate'
import { createTaskSchema, updateTaskSchema } from '@/schemas/tasks.schema'
import { createTask, deleteTask, getTask, getTasksQuery, updateTask } from '@/controllers/tasks.controller'

const router = Router()

router.post('/', authenticate, validate(createTaskSchema), createTask)
router.get('/', authenticate, getTasksQuery)
router.get('/:id', authenticate, getTask)
router.patch('/:id', authenticate, validate(updateTaskSchema), updateTask)
router.delete('/:id', authenticate, deleteTask)

export { router as tasksRouter }