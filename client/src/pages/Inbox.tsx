import { SubHeader } from '@/components/common/SubHeader'

import { useSuspenseQuery } from '@tanstack/react-query'
import { getTasks } from '@/services/api/tasks'

function InboxPage() {
	const { data } = useSuspenseQuery({
		queryKey: ['tasks', 'inbox'],
		queryFn: () =>
			getTasks({
				listId: 'null',
			}),
	})
	
	return(
		<>
			<SubHeader
				title='Inbox'
				subtitle='Tasks without a list'
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

export default InboxPage