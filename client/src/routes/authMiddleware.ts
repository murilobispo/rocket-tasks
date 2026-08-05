import type { MiddlewareFunction } from 'react-router'
import { redirect } from 'react-router'
import { getToken } from '@/services/auth/storage'

export const authMiddleware: MiddlewareFunction = async ({ context }, next) => {
  const token = getToken()

  if (!token) {
    throw redirect('/login')
  }

  return next()
}
