import { apiClient } from '@/services/api/client'
import { setToken } from '@/services/auth/storage'
import type { AuthResponse } from '@/types/auth'

export async function login(email: string, password: string): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>('/auth/login', { email, password })
  setToken(data.token)
  return data
}

export async function register(name: string, email: string, password: string): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>('/auth/register', { name, email, password })
  setToken(data.token)
  return data
}