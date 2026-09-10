import { SubHeader } from '@/components/common/SubHeader'

import { useSuspenseQuery } from '@tanstack/react-query'
import { getTasks } from '@/services/api/tasks'
import { TaskList } from '@/components/common/TaskList'

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