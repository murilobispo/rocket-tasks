import { z } from 'zod'
import { startOfDay, endOfDay } from 'date-fns'
import { getTasksQuerySchema } from '@/schemas/tasks.schema'

type DueFilter = z.infer<typeof getTasksQuerySchema>['due']

export function getDueDateFilter(due: DueFilter) {
  if (!due) return undefined

  const now = new Date()

  switch (due) {
    case 'today':
      return {
        gte: startOfDay(now),
        lte: endOfDay(now)
      }

    case 'upcoming':
      return {
        gt: endOfDay(now)
      }

    case 'past':
      return {
        lt: startOfDay(now)
      }
  }
}