import { SubHeader } from '@/components/common/SubHeader'

import { useSuspenseQuery } from '@tanstack/react-query'
import { getTasks } from '@/services/api/tasks'

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
				onClick={() => console.log('test')}
			/>
			{data.data.map((task) => (
				<div key={task.id}>
					{task.title}
				</div>
			))}
		</>
	)
}

export default UpcomingPage