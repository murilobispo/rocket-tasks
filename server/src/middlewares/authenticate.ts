import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '@/config/env'
import { sendBearerError } from '@/utils/bearerError'

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers.authorization

  if (!authorization) {
    return sendBearerError(res, 'invalid_request', 'Token not provided')
  }

  const [scheme, token] = authorization.split(' ')

  if (scheme?.toLowerCase() !== 'bearer') {
    return sendBearerError(res, 'invalid_request', 'Authentication scheme must be Bearer')
  }

  if (!token) {
    return sendBearerError(res, 'invalid_request', 'Token not provided')
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as {
      userId: string
    }
    req.userId = decoded.userId
    next()
  } catch {
    return sendBearerError(res, 'invalid_token', 'Invalid or expired token')
  }
}