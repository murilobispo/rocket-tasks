import { apiClient } from '@/services/api/client'
import type { User, UpdateUser } from '@/types/user'

export async function getMe(): Promise<User> {
  const { data } = await apiClient.get<User>('/users/me')

  return data
}

export async function updateMe(avatarUrl: string | null, name: string): Promise<User> {
  const response = await apiClient.patch<User>('/users/me', { avatarUrl, name })
  
  return response.data
} 