import { Request, Response } from 'express'
import { AppError } from '@/utils/AppError'
import { getMe as getMeService } from '@/services/users.service'
import { deleteMe as deleteMeService } from '@/services/users.service'
import { updatePassword as updatePasswordService } from '@/services/users.service'
import { updateMe as updateMeService } from '@/services/users.service'

export async function getMe(req: Request, res: Response) {
	try {
		const result = await getMeService(req.userId)
		return res.status(200).json(result)
	} catch (error){
		if (error instanceof AppError){
			return res.status(error.statusCode).json({ message: error.message})
		}
		return res.status(500).json({ message: 'Internal server error'})
	}
}

export async function updateMe(req: Request, res: Response) {
	try {
		const result = await updateMeService(req.userId, req.body)
		return res.status(200).json(result)
	} catch (error){
		return res.status(500).json({ message: 'Internal server error'})
	}
}

export async function updatePassword(req: Request, res: Response) {
	try {
		await updatePasswordService(req.userId, req.body)
		return res.status(204).send()
	} catch (error){
		if (error instanceof AppError){
			return res.status(error.statusCode).json({ message: error.message })
		}
		return res.status(500).json({ message: 'Internal server error'})
	}
}

export async function deleteMe(req: Request, res: Response) {
	try {
		await deleteMeService( req.userId)
		return res.status(204).send()
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error'})
	}
}