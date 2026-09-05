import { SubHeader } from '@/components/common/SubHeader'

import { useSuspenseQuery } from '@tanstack/react-query'
import { getTasks } from '@/services/api/tasks'

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

export default CompletedPage