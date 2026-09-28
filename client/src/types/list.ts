export type List = {
  id: string
  title: string
  description: string | null
  color: string
  createdAt: string
  updatedAt: string
  _count: {
    tasks: number
  }
}