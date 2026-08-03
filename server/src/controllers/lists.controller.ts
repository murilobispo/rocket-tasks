import { Request, Response } from 'express'
import { createList as createListService } from '@/services/lists.service'
import { getLists as getListsService } from '@/services/lists.service'
import { updateList as updateListService } from '@/services/lists.service'
import { deleteList as deleteListService } from '@/services/lists.service'

export async function createList(req: Request, res: Response) {
	const result = await createListService(req.userId, req.body)
	return res.status(201).json(result)
}

export async function getLists(req: Request, res: Response) {
	const result = await getListsService(req.userId)
	return res.status(200).json(result)
}

export async function updateList(req: Request, res: Response) {
 	const id = req.params.id as string
	const result = await updateListService(req.userId, id, req.body)
	return res.status(200).json(result)	
}

export async function deleteList(req: Request, res: Response) {
	const id = req.params.id as string
	await deleteListService(req.userId, id)
	return res.status(204).send()
}