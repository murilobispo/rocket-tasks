import { Request, Response } from 'express'
import { AppError } from '@/utils/AppError'
import { register as registerService } from '@/services/auth.service'
import { login as loginService } from '@/services/auth.service'
import { getMe as getMeService } from '@/services/auth.service'

export async function register (req: Request, res: Response) {
	try {
		const result = await registerService(req.body)
		return res.status(201).json(result)
	} catch (error){
		if (error instanceof AppError){
			return res.status(error.statusCode).json({ message: error.message })
		}
		return res.status(500).json({ message: 'Internal server error' })
	}
}

export async function login (req: Request, res: Response){
	try {
		const result = await loginService(req.body)
		return res.status(200).json(result)
	} catch (error){
		if (error instanceof AppError){
			return res.status(error.statusCode).json({ message : error.message })
		}
		return res.status(500).json({ message: 'Internal server error' })
	}
}

export async function getMe(req: Request, res: Response){
	try {
		const result = await getMeService(req.userId)
		return res.status(200).json(result)
	} catch (error){
		if (error instanceof AppError){
			return res.status(error.statusCode).json({ message : error.message})
		}
		return res.status(500).json({ message: 'Internal server error'})
	}
}