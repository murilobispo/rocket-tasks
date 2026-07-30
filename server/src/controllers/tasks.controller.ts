import { Request, Response } from 'express'
import { createTask as createTaskService } from '@/services/tasks.service'
import { getTasksQuery as getTasksQueryService } from '@/services/tasks.service'
import { getTask as getTaskService } from '@/services/tasks.service'
import { updateTask as updateTaskService } from '@/services/tasks.service'
import { deleteTask as deleteTaskService } from '@/services/tasks.service'
import { getTasksQuerySchema } from '@/schemas/tasks.schema'

export async function createTask(req: Request, res: Response) {
	const result = await createTaskService(req.userId, req.body)
	return res.status(201).json(result)
}

export async function getTasksQuery(req: Request, res: Response) {
	const parsedQuery = getTasksQuerySchema.safeParse(req.query)

  if (!parsedQuery.success) {
    return res.status(422).json({errors: parsedQuery.error.issues})
  }

	const result = await getTasksQueryService(req.userId, parsedQuery.data)
	return res.status(200).json(result)
}

export async function getTask(req: Request, res: Response) {
	const id = req.params.id as string
	
	const result = await getTaskService(req.userId, id)
	return res.status(200).json(result)
}

export async function updateTask(req: Request, res: Response) {
	const id = req.params.id as string

	const result = await updateTaskService(req.userId, id, req.body)
	return res.status(200).json(result)
}

export async function deleteTask(req: Request, res: Response) {
	const id = req.params.id as string
	await deleteTaskService(req.userId, id)
	return res.status(204).send()
}