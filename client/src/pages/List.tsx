import { useSuspenseQuery } from '@tanstack/react-query'
import { data ,useParams } from 'react-router'

import { SubHeader } from '@/components/common/SubHeader'
import { TaskList } from '@/components/common/TaskList'
import { queryClient } from '@/lib/queryClient'
import { getTasks } from '@/services/api/tasks'

import type { List } from '@/types/list'

function ListPage() {
	const { id } = useParams()

	const lists = queryClient.getQueryData<List[]>(['lists'])
	const list = lists?.find((list) => list.id === id)

	if (!list) {
		throw data('List not found', { status: 404 })
	}

	const { data: tasks } = useSuspenseQuery({
		queryKey: ['tasks', 'list', id],
		queryFn: () =>
			getTasks({
				listId: id,
			}),
	})

	return (
		<>
			<SubHeader
				title={list.title}
				subtitle={list.description ?? ''}
			/>

			<TaskList
				tasks={tasks.data}
				emptyLabel='This list is empty.'
			/>
		</>
	)
}

export default ListPage