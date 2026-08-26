import { apiClient } from '@/services/api/client'
import type { List } from '@/types/list'

export async function createList(title: string, color?: string, description?: string): Promise<List> {
	const { data } = await apiClient.post(
		'/lists',
		{ title, color, description }
	)
	return data
}

export async function getLists(): Promise<List[]> {
	const { data } = await apiClient.get('/lists')
	
	return data
}

export async function deleteList(id: string): Promise<void> {
	await apiClient.delete(`/lists/${id}`)
}
