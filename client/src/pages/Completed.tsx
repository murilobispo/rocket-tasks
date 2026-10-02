import { SubHeader } from '@/components/common/SubHeader'
import { TaskList } from '@/components/common/TaskList'
import { TaskPagination } from '@/components/common/TaskPagination'
import { useTasks } from '@/hooks/useTasks'

function CompletedPage() {
	const { tasks, meta, page, onPageChange, isPending, isFetching } = useTasks(
		['tasks', 'completed'],
		{ completed: true }
	)

	return(
		<>
			<SubHeader
				title='Completed'
				subtitle="Tasks you've already finished"
			/>
			<TaskList
				tasks={tasks}
				emptyLabel='Nothing completed yet.'
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

export default CompletedPage
