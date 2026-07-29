import { Request, Response } from 'express'
import { createList as createListService } from '@/services/lists.service'
import { getLists as getListsService } from '@/services/lists.service'
import { updateList as updateListService } from '@/services/lists.service'
import { deleteList as deleteListService } from '@/services/lists.service'
import { AppError } from '@/utils/AppError'

export async function createList(req: Request, res: Response) {
	try {
		const result = await createListService(req.userId, req.body)
		return res.status(201).json(result)
	} catch (error) {
		return res.status(500).json({ message : 'Internal server error'})
	}
}

export async function getLists(req: Request, res: Response) {
	try {
		const result = await getListsService(req.userId)
		return res.status(200).json(result)
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error'})
	}
}

export async function updateList(req: Request, res: Response) {
 	const id = req.params.id as string
	try {
		const result = await updateListService(req.userId, id, req.body)
		return res.status(200).json(result)
	} catch (error) {
		if (error instanceof AppError){
			return res.status(error.statusCode).json({ message: error.message})
		}
		return res.status(500).json({ message: 'Internal server error'})
	}
}

export async function deleteList(req: Request, res: Response) {
	const id = req.params.id as string
	try {
		await deleteListService(req.userId, id)
		return res.status(204).send()
	} catch (error) {
		if (error instanceof AppError){
			return res.status(error.statusCode).json({ message: error.message})
		}
		return res.status(500).json({ message: 'Internal server error'})
	}
}