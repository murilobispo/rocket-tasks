import { SubHeader } from '@/components/common/SubHeader'
import { TaskList } from '@/components/common/TaskList'
import { TaskPagination } from '@/components/common/TaskPagination'
import { useTasks } from '@/hooks/useTasks'

function UpcomingPage() {
	const { tasks, meta, page, onPageChange, isPending, isFetching } = useTasks(
		['tasks', 'upcoming'],
		{ due: 'upcoming' }
	)

	return(
		<>
			<SubHeader
				title='Upcoming'
				subtitle='Tasks with a future due date'
			/>
			<TaskList
				tasks={tasks}
				emptyLabel='No upcoming tasks.'
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

export default UpcomingPage
