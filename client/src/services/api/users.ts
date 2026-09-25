import { apiClient } from '@/services/api/client'
import type { User } from '@/types/user'

export async function getMe(): Promise<User> {
  const { data } = await apiClient.get<User>('/users/me')

  return data
}

export async function updateMe(avatarUrl: string | null, name: string): Promise<User> {
  const response = await apiClient.patch<User>('/users/me', { avatarUrl, name })
  
  return response.data
} 

export async function deleteMe(): Promise<void> {
  await apiClient.delete('/users/me')
}

export async function updatePassword(currentPassword: string, newPassword: string): Promise<void> {
  await apiClient.patch('/users/me/password', { currentPassword, newPassword })
}