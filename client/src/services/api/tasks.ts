import { apiClient } from '@/services/api/client'
import type { PaginatedResponse } from '@/types/paginated'
import type { Task } from '@/types/task'


export interface GetTasksParams {
  completed?: boolean
  due?: 'today' | 'upcoming' | 'past'
  listId?: string | 'null'
  sortBy?: 'createdAt' | 'dueDate' | 'title'
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number 
}

export async function getTasks(params? : GetTasksParams): Promise<PaginatedResponse<Task>> {
  const { data } = await apiClient.get(
		'/tasks',
		{params}
	 )

  return data
}