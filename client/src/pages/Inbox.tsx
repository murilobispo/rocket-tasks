import { useSuspenseQuery } from '@tanstack/react-query'

import { SubHeader } from '@/components/common/SubHeader'
import { TaskList } from '@/components/common/TaskList'
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
			/>
			<TaskList 
				tasks={data.data} 
				emptyLabel='Inbox zero — nice work.'
			/>
		</>
	)
}

export default InboxPage