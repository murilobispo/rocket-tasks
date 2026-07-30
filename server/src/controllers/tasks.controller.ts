import { Request, Response } from 'express'
import { AppError } from '@/utils/AppError'
import { createTask as createTaskService } from '@/services/tasks.service'
import { getTasksQuery as getTasksQueryService } from '@/services/tasks.service'
import { getTask as getTaskService } from '@/services/tasks.service'
import { updateTask as updateTaskService } from '@/services/tasks.service'
import { deleteTask as deleteTaskService } from '@/services/tasks.service'
import { getTasksQuerySchema } from '@/schemas/tasks.schema'

export async function createTask(req: Request, res: Response) {
	try {
		const result = await createTaskService(req.userId, req.body)
		return res.status(201).json(result)
	} catch (error) {
		if (error instanceof AppError){
			return res.status(error.statusCode).json({ message: error.message })
		}
		return res.status(500).json({ message: 'Internal server error' })
	}
}

export async function getTasksQuery(req: Request, res: Response) {
	 const parsedQuery = getTasksQuerySchema.safeParse(req.query)

  if (!parsedQuery.success) {
    return res.status(422).json({errors: parsedQuery.error.issues})
  }

	try {
		const result = await getTasksQueryService(req.userId, parsedQuery.data)
		return res.status(200).json(result)
	} catch (error) {
		if (error instanceof AppError){
			return res.status(error.statusCode).json({ message: error.message })
		}
		return res.status(500).json({ message: 'Internal server error' })
	}
}

export async function getTask(req: Request, res: Response) {
	const id = req.params.id as string
	
	try {
		const result = await getTaskService(req.userId, id)
		return res.status(200).json(result)
	} catch (error) {
		if (error instanceof AppError){
			return res.status(error.statusCode).json({ message: error.message })
		}
		return res.status(500).json({ message: 'Internal server error' })
	}
}

export async function updateTask(req: Request, res: Response) {
	const id = req.params.id as string

	try {
		const result = await updateTaskService(req.userId, id, req.body)
		return res.status(200).json(result)
	} catch (error) {
		if (error instanceof AppError){
			return res.status(error.statusCode).json({ message: error.message})
		}
		return res.status(500).json({ message: 'Internal server error'})
	}
}

export async function deleteTask(req: Request, res: Response) {
	const id = req.params.id as string

	try {
		await deleteTaskService(req.userId, id)
		return res.status(204).send()
	} catch (error) {
		if (error instanceof AppError){
			return res.status(error.statusCode).json({ message: error.message })
		}
		return res.status(500).json({ message: 'Internal server error' })
	}
}