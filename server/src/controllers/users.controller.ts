import { Request, Response } from 'express'
import { getMe as getMeService } from '@/services/users.service'
import { deleteMe as deleteMeService } from '@/services/users.service'
import { updatePassword as updatePasswordService } from '@/services/users.service'
import { updateMe as updateMeService } from '@/services/users.service'

export async function getMe(req: Request, res: Response) {
	const result = await getMeService(req.userId)
	return res.status(200).json(result)
}

export async function updateMe(req: Request, res: Response) {
	const result = await updateMeService(req.userId, req.body)
	return res.status(200).json(result)
}

export async function updatePassword(req: Request, res: Response) {
	await updatePasswordService(req.userId, req.body)
	return res.status(204).send()
}

export async function deleteMe(req: Request, res: Response) {
	await deleteMeService( req.userId)
	return res.status(204).send()
}