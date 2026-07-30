import { Request, Response } from 'express'
import { register as registerService } from '@/services/auth.service'
import { login as loginService } from '@/services/auth.service'

export async function register(req: Request, res: Response) {
	const result = await registerService(req.body)
	return res.status(201).json(result)
}

export async function login(req: Request, res: Response) {
	const result = await loginService(req.body)
	return res.status(200).json(result)
}