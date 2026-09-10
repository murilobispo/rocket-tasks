import { Pencil, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { ListChecks } from 'lucide-react'
import { queryClient } from '@/lib/queryClient'

import type { Task } from '@/types/task'

import { deleteTask, updateTask } from '@/services/api/tasks'
import { toast } from 'sonner'
import { useState } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'

interface TaskListProps {
	tasks: Task[]
	emptyLabel: string
}

export function TaskList({ tasks, emptyLabel }: TaskListProps) {

	const isMobile = useIsMobile()

	const [isFetching, setIsFetching] =  useState(false)

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

	const handleDeleteTask = async (taskId: string) => {
		setIsFetching(true)
		try {
			await deleteTask(taskId)
			await queryClient.invalidateQueries({
				queryKey: ['tasks'],
			})
		} catch (error) {
			toast.error('Failed to delete task')
		} finally {
			setIsFetching(false)
		}
	}	

	const handleCompleteTask = async (taskId: string, completed: boolean) => {

		setIsFetching(true)
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
			setIsFetching(false)
		}
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
							<p className={`min-w-0 line-clamp-3 text-sm transition-all duration-300 ${task.completed ? 'text-muted-foreground line-through' : ''}`}>
								{task.title}
							</p>
						</div>
						<div className={`flex shrink-0 items-center gap-1 transition-opacity ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
							<Tooltip>
								<TooltipTrigger render={
									<Button
										variant='ghost'
										size='icon'
										aria-label='Edit task'
									>
										<Pencil className='size-4' />
									</Button>
									}/>
								<TooltipContent className={'text-sm'}>Edit</TooltipContent>
							</Tooltip>
							
							<Tooltip>
								<TooltipTrigger render={
									<Button
										variant='ghost'
										size='icon'
										className='text-muted-foreground hover:text-destructive'
										aria-label='Delete task'
										onClick={() => handleDeleteTask(task.id)}
										disabled={isFetching}
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