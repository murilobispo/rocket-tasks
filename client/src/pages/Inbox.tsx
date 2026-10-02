import { SubHeader } from '@/components/common/SubHeader'
import { TaskList } from '@/components/common/TaskList'
import { TaskPagination } from '@/components/common/TaskPagination'
import { useTasks } from '@/hooks/useTasks'

function InboxPage() {
	const { tasks, meta, page, onPageChange, isPending, isFetching } = useTasks(
		['tasks', 'inbox'],
		{ listId: 'null' }
	)

	return(
		<>
			<SubHeader
				title='Inbox'
				subtitle='Tasks without a list'
			/>
			<TaskList
				tasks={tasks}
				emptyLabel='Inbox zero — nice work.'
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

export default InboxPage
