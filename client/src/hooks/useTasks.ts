import { keepPreviousData, useQuery, type QueryKey } from '@tanstack/react-query'
import { useState } from 'react'

import { getTasks } from '@/services/api/tasks'
import type { PaginationMeta } from '@/types/paginated'
import type { GetTasksParams, Task } from '@/types/task'

type TaskFilter = Omit<GetTasksParams, 'page'>

interface UseTasksResult {
  tasks: Task[]
  meta: PaginationMeta | undefined
  page: number
  onPageChange: (page: number) => void
  isPending: boolean
  isFetching: boolean
}

/**
 * Removing the last task of a page shrinks the page count, which can leave the
 * requested page beyond the end of the collection. Fall back to the last page
 * that still holds tasks instead of serving an empty one.
 */
async function fetchPage(filter: TaskFilter, page: number) {
  const result = await getTasks({ ...filter, page })

  const lastPage = Math.max(result.meta.totalPages, 1)
  if (page <= lastPage) return result

  return getTasks({ ...filter, page: lastPage })
}

export function useTasks(queryKey: QueryKey, filter: TaskFilter): UseTasksResult {
  const [requestedPage, setRequestedPage] = useState(1)

  const { data, isPending, isFetching } = useQuery({
    queryKey: [...queryKey, filter, requestedPage],
    queryFn: () => fetchPage(filter, requestedPage),
    placeholderData: keepPreviousData,
  })

  const totalPages = data?.meta.totalPages
  const page = totalPages !== undefined
    ? Math.min(requestedPage, Math.max(totalPages, 1))
    : requestedPage

  return {
    tasks: data?.data ?? [],
    meta: data?.meta,
    page,
    onPageChange: setRequestedPage,
    isPending,
    isFetching,
  }
}
