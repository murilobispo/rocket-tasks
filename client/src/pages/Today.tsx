import { SubHeader } from '@/components/common/SubHeader'
import { TaskList } from '@/components/common/TaskList'
import { TaskPagination } from '@/components/common/TaskPagination'
import { useTasks } from '@/hooks/useTasks'

function TodayPage() {
	const { tasks, meta, page, onPageChange, isPending, isFetching } = useTasks(
		['tasks', 'today'],
		{ due: 'today' }
	)

	return(
		<>
			<SubHeader
				title='Today'
				subtitle='Everything due today'
			/>
			<TaskList
				tasks={tasks}
				emptyLabel='Nothing due today.'
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

export default TodayPage
