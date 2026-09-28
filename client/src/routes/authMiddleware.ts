import type { MiddlewareFunction } from 'react-router'
import { redirect } from 'react-router'
import { getToken } from '@/services/auth/storage'

export const authMiddleware: MiddlewareFunction = async (_, next) => {
  const token = getToken()

  if (!token) {
    throw redirect('/login')
  }

  return next()
}
