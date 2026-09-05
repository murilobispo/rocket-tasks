import { SubHeader } from '@/components/common/SubHeader'

import { useSuspenseQuery } from '@tanstack/react-query'
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

export default TodayPage