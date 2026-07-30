import { AppError } from '@/utils/AppError';
import { type Request, type Response, type NextFunction } from 'express';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
	if(err instanceof AppError){
		return res.status(err.statusCode).json({ message: err.message })
	}
	return res.status(500).json({ message: 'Internal server error' })
}