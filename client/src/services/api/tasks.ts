import { apiClient } from '@/services/api/client'
import type { PaginatedResponse } from '@/types/paginated'
import type { Task, GetTasksParams, UpdateTaskData } from '@/types/task'

export async function createTask(title: string, dueDate: string | undefined, listId: string | undefined): Promise<Task> {
  const response = await apiClient.post(
    '/tasks',
    { title, dueDate, listId }
  )
  
  return response.data
}

export async function getTasks(params? : GetTasksParams): Promise<PaginatedResponse<Task>> {
  const { data } = await apiClient.get(
		'/tasks',
		{params}
	 )

  return data
}

export async function updateTask(id: string, data: UpdateTaskData): Promise<Task> {
  const response = await apiClient.patch(
    `/tasks/${id}`,
    data,
  )

  return response.data
}

export async function deleteTask(id: string): Promise<void> {
  await apiClient.delete(`/tasks/${id}`)
}