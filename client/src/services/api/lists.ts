import { apiClient } from '@/services/api/client'
import type { List } from '@/types/list'

export async function getLists(): Promise<List[]> {
	const { data } = await apiClient.get('/lists')
	
	return data
}
