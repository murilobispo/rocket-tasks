import { SubHeader } from '@/components/common/SubHeader'

import { useSuspenseQuery } from '@tanstack/react-query'
import { getTasks } from '@/services/api/tasks'
import { TaskList } from '@/components/common/TaskList'

function CompletedPage() {
	const { data } = useSuspenseQuery({
		queryKey: ['tasks', 'completed'],
		queryFn: () =>
			getTasks({
				completed: true
			}),
	})
	
	return(
		<>
			<SubHeader
				title='Completed'
				subtitle="Tasks you've already finished"
			/>
			<TaskList 
				tasks={data.data} 
				emptyLabel='Nothing completed yet.'
			/>
		</>
	)
}

export default CompletedPage