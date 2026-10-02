import { data, useParams } from 'react-router'
import { CircleSmall } from 'lucide-react'

import { SubHeader } from '@/components/common/SubHeader'
import { TaskList } from '@/components/common/TaskList'
import { TaskPagination } from '@/components/common/TaskPagination'

import { queryClient } from '@/lib/queryClient'
import { useTasks } from '@/hooks/useTasks'
import type { List } from '@/types/list'

function ListPage() {
	const { id } = useParams()

	const { tasks, meta, page, onPageChange, isPending, isFetching } = useTasks(
		['tasks', 'list', id],
		{ listId: id }
	)

	const lists = queryClient.getQueryData<List[]>(['lists'])
	const list = lists?.find((list) => list.id === id)

	if (!list) {
		throw data('List not found', { status: 404 })
	}

	return (
		<>
			<SubHeader
				title={
					<>
						<CircleSmall
							className='fill-current'
							style={{
								color: list.color || 'var(--muted-foreground)',
							}}
						/>
						{list.title}
					</>
				}
				subtitle={list.description ?? ''}
			/>

			<TaskList
				tasks={tasks}
				emptyLabel='This list is empty.'
				listBadge={false}
				isPending={isPending}
				isFetching={isFetching}
			/>

			<TaskPagination
				meta={meta}
				page={page}
				onPageChange={onPageChange}
				isFetching={isFetching}
			/>
		</>
	)
}

export default ListPage
