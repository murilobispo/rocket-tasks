import { useState } from 'react'
import { Calendar, CircleSmall, ListChecks, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip'

import { useIsMobile } from '@/hooks/use-mobile'
import { queryClient } from '@/lib/queryClient'
import { deleteTask, updateTask } from '@/services/api/tasks'
import type { List } from '@/types/list'
import type { Task } from '@/types/task'
import { formatDueDate } from '@/utils/formatDueDate'

interface TaskListProps {
	tasks: Task[]
	emptyLabel: string
	listBadge?: boolean
	isPending?: boolean
	isFetching?: boolean
}

function TaskListSkeleton({ rows = 5 }: { rows?: number }) {
	return (
		<div className='overflow-hidden rounded-lg border border-border/80 shadow-sm' role='status' aria-label='Loading tasks'>
			<ul>
				{Array.from({ length: rows }).map((_, index) => (
					<li key={index} className={`flex items-center gap-3 px-5 py-3 ${index > 0 ? 'border-t' : ''}`}>
						<div className='h-5 w-5 animate-pulse rounded-md bg-muted' />
						<div className='flex-1 space-y-2'>
							<div className='h-4 animate-pulse rounded bg-muted' style={{ width: `${55 + (index % 3) * 15}%` }} />
							<div className='h-3 w-24 animate-pulse rounded bg-muted/70' />
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}

export function TaskList({ tasks, emptyLabel, listBadge = true, isPending = false, isFetching = false }: TaskListProps) {

	const isMobile = useIsMobile()
	const [isSaving, setIsSaving] = useState(false)
	const lists = queryClient.getQueryData<List[]>(['lists']) ?? []

	const handleDeleteTask = async (taskId: string) => {
		setIsSaving(true)
		try {
			await deleteTask(taskId)
			await queryClient.invalidateQueries({
				queryKey: ['tasks'],
			})
		} catch {
			toast.error('Failed to delete task')
		} finally {
			setIsSaving(false)
		}
	}

	const handleCompleteTask = async (taskId: string, completed: boolean) => {

		setIsSaving(true)
		try {
			await updateTask(taskId, {
				completed: !completed,
			})

			await queryClient.invalidateQueries({
				queryKey: ['tasks'],
			})
		} catch {
			toast.error('Failed to update task')
		} finally {
			setIsSaving(false)
		}
	}

	if (isPending || (isFetching && tasks.length === 0)) {
		return <TaskListSkeleton />
	}

	if (tasks.length === 0) {
		return(
			<div className='flex flex-col items-center justify-center gap-2 py-20 text-center '>
				<div className='flex h-17 w-17 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
					<ListChecks className='h-9 w-9' />
				</div>
				<p className='text-lg font-medium'>{emptyLabel}</p>
				<p className='text-sm text-muted-foreground'>
					Tap “New task” to add your first one.
				</p>
			</div>
		)
	}

	return (
		<div className='overflow-hidden rounded-lg border border-border/80 shadow-sm'>
			<ul>
				{tasks.map((task, index) => (
					<li key={task.id} className={`group flex justify-between items-center gap-3 px-5 py-3 transition-all duration-200 hover:bg-muted/40 ${index > 0 ? 'border-t' : ''	}`}>
						<div className='flex min-w-0 flex-1 items-center gap-3'>
							<Checkbox
								checked={task.completed}
								onCheckedChange={() =>
									handleCompleteTask(task.id, task.completed)
								}
								className='h-5 w-5 transition-transform active:scale-90 border-primary'
							/>
							<div>
								<p className={`min-w-0 line-clamp-3 text-sm transition-all duration-300 ${task.completed ? 'text-muted-foreground line-through' : ''}`}>
									{task.title}
								</p>
								<div className='text-muted-foreground text-xs flex gap-2'>
									{task.listId && listBadge && (() => {
										const taskList = lists.find((list) => list.id === task.listId)
										if (!taskList) return null

										return (
											<Badge variant='outline'>
												<CircleSmall
													className='fill-current'
													style={{
														color: taskList.color || 'var(--muted-foreground)',
													}}
												/>
												{taskList.title.length > 15
													? `${taskList.title.slice(0, 15)}...`
													: taskList.title}
											</Badge>
										)
									})()}
									{task.dueDate && (() => {
										const dueDate = formatDueDate(task.dueDate)

										return (
											<Badge
												variant="ghost"
												className={`p-0 ${dueDate === 'Today' ? 'text-primary' : ''}`}
											>
												<Calendar />
												{dueDate}
											</Badge>
										)
									})()}
								</div>
							</div>
						</div>
						<div className={`flex shrink-0 items-center gap-1 transition-opacity ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
							<Tooltip>
								<TooltipTrigger render={
									<Button
										variant='ghost'
										size='icon'
										className='text-muted-foreground hover:text-destructive'
										aria-label='Delete task'
										onClick={() => handleDeleteTask(task.id)}
										disabled={isSaving}
									>
										<Trash2 className='size-4' />
									</Button>
									}/>
								<TooltipContent className={'text-sm'}>Delete</TooltipContent>
							</Tooltip>
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}
