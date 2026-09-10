import { SubHeader } from '@/components/common/SubHeader'

import { useSuspenseQuery } from '@tanstack/react-query'
import { getTasks } from '@/services/api/tasks'
import { TaskList } from '@/components/common/TaskList'

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
			/>
			<TaskList 
				tasks={data.data} 
				emptyLabel='Inbox zero — nice work.'
			/>
		</>
	)
}

export default InboxPage