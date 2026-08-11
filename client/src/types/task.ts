export interface Task {
  id: string
  title: string
  dueDate: string | null
  completed: boolean
  createdAt: string
  updatedAt: string
  listId: string | null
}