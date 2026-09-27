import { useSuspenseQuery } from '@tanstack/react-query'

import { SubHeader } from '@/components/common/SubHeader'
import { TaskList } from '@/components/common/TaskList'
import { getTasks } from '@/services/api/tasks'

function TodayPage() {
	const { data } = useSuspenseQuery({
		queryKey: ['tasks', 'today'],
		queryFn: () =>
			getTasks({
				due: 'today'
			}),
	})
	
	return(
		<>
			<SubHeader
				title='Today'
				subtitle='Everything due today'
			/>
			<TaskList 
				tasks={data.data} 
				emptyLabel='Nothing due today.'
			/>
		</>
	)
}

export default TodayPage