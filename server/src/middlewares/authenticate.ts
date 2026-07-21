import { Request, Response, NextFunction } from 'express'
import { AppError } from '@/utils/AppError'
import jwt from 'jsonwebtoken'
import { env } from '@/config/env'

export function authenticate(req: Request, res: Response, next: NextFunction){
	const authorization = req.headers.authorization

	if(!authorization){
		throw new AppError('Token not provided', 401)
	}

	const [scheme, token] = authorization.split(' ')

	if (scheme.toLowerCase() !== 'bearer') {
		throw new AppError('Invalid token format', 401)
	}

	try {
		const decoded = jwt.verify(token, env.JWT_SECRET) as {
			userId: string
		}
		req.userId = decoded.userId
		next()
	} catch {
		throw new AppError('Invalid or expired token', 401)
	}	
}
