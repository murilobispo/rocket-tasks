import { SubHeader } from '@/components/common/SubHeader'

import { useSuspenseQuery } from '@tanstack/react-query'
import { getTasks } from '@/services/api/tasks'
import { TaskList } from '@/components/common/TaskList'

function UpcomingPage() {
	const { data } = useSuspenseQuery({
		queryKey: ['tasks', 'upcoming'],
		queryFn: () =>
			getTasks({
				due: 'upcoming'
			}),
	})
	
	return(
		<>
			<SubHeader
				title='Upcoming'
				subtitle='Tasks with a future due date'
			/>
			<TaskList 
				tasks={data.data} 
				emptyLabel='No upcoming tasks.'
			/>
		</>
	)
}

export default UpcomingPage