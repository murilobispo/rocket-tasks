import { useSuspenseQueries } from '@tanstack/react-query'

import { getLists } from '@/services/api/lists'
import { getTasks } from '@/services/api/tasks'

export function useSidebarData() {
  return useSuspenseQueries({
    queries: [
      {
        queryKey: ['lists'],
        queryFn: getLists,
      },
			{
        queryKey: ['tasks', 'inbox', 'count'],
        queryFn: () =>
          getTasks({
            limit: 1,
            listId: 'null'
          }),
      },
      {
        queryKey: ['tasks', 'today', 'count'],
        queryFn: () =>
          getTasks({
            due: 'today',
            limit: 1,
          }),
      },
      {
        queryKey: ['tasks', 'upcoming', 'count'],
        queryFn: () =>
          getTasks({
            due: 'upcoming',
            limit: 1,
          }),
      },
      {
        queryKey: ['tasks', 'completed', 'count'],
        queryFn: () =>
          getTasks({
            completed: true,
            limit: 1,
          }),
      },
    ],
  })
}