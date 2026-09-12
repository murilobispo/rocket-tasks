import { isToday, isPast, formatDistanceToNow } from 'date-fns'

export function formatDueDate(date: string) {
  const dueDate = new Date(date)

  if (isToday(dueDate)) {
    return 'Today'
  }

  return formatDistanceToNow(dueDate, {
    addSuffix: true,
  })
}