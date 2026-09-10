export interface Task {
  id: string
  title: string
  dueDate: string | null
  completed: boolean
  createdAt: string
  updatedAt: string
  listId: string | null
}

export interface GetTasksParams {
  completed?: boolean
  due?: 'today' | 'upcoming' | 'past'
  listId?: string | 'null'
  sortBy?: 'createdAt' | 'dueDate' | 'title'
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number 
}

export interface UpdateTaskData extends Partial<
  Pick<Task, 'title' | 'completed' | 'dueDate' | 'listId'>
> {}