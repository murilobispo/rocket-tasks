import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from '@/components/ui/field'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { queryClient } from '@/lib/queryClient'
import type { List } from '@/types/list'

import { createTask } from '@/services/api/tasks'

import { Inbox, CircleSmall } from 'lucide-react'

import { toast } from 'sonner'
import { isAxiosError } from 'axios'
import { normalizeErrors } from '@/utils/normalizeErrors'

import { useNavigate } from 'react-router'

interface Props {
  trigger: React.ReactElement
}

function CreateTaskDialog({ trigger }: Props) {

	const navigate = useNavigate()

	const [title, setTitle] = useState('')
	const [dueDate, setDueDate] = useState('')
	const [listId, setListId] = useState<string | null>(null)

	const lists = queryClient.getQueryData<List[]>(['lists']) ?? []

	const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

	const [isSubmitting, setIsSubmitting] = useState(false)

	const [open, setOpen] = useState(false)

	const selectItems = [
		{ label: 'Inbox', value: null, icon: <Inbox /> },
		...lists.map((list) => ({
			label: list.title,
			value: list.id,
			icon: <CircleSmall
							className='fill-current'
							style={{
								color: list.color || 'var(--muted-foreground)',
							}}
						/>
		})),
	]
	
	const clearError = (key: string) => {
		setFieldErrors((prev) => ({
			...prev,
			[key]: '',
		}))
	}

	const clearFields = () => {
		setTitle('')
		setDueDate('')
		setListId(null)
		setFieldErrors({})
	}

	const handleSubmit = async () => {
		setFieldErrors({})
		setIsSubmitting(true)

		const formattedDueDate = dueDate
			? new Date(`${dueDate}T00:00:00`).toISOString()
			: undefined

		try {
			await createTask(title, formattedDueDate || undefined, listId || undefined)

			await queryClient.invalidateQueries({
				queryKey: ['tasks'],
			})
			if (listId){
				await queryClient.invalidateQueries({
					queryKey: ['lists'],
				})
			}

			setFieldErrors({})
			toast.success('Task created successfully!')
			setOpen(false)
			
			if (listId){
				navigate(`/list/${listId}`)
			} else {
				navigate(`/`)
			}

		} catch (error) {
			if (isAxiosError(error) && error.response?.status === 422) {
				const errors = normalizeErrors(error.response.data)

				setFieldErrors(errors)
				return
			}

			toast.error('Could not create the task.')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<Dialog open={open} onOpenChange={(o) => {
			setOpen(o)
			clearFields()
		}}>
			<DialogTrigger render={trigger}/>
			<DialogContent>
				<DialogHeader>
          <DialogTitle>{'New task'}</DialogTitle>
          <DialogDescription>Add a task to stay on track.</DialogDescription>
        </DialogHeader>
				<FieldSet>
					<FieldGroup>
						<Field data-invalid={!!fieldErrors.title}>
							<FieldLabel htmlFor='title'>Title</FieldLabel>
							<Input
								id='title'
								value={title}
								onChange={(e) => {
									setTitle(e.target.value)
									clearError('title')
								}}
								placeholder='What needs to be done?'
								maxLength={100}
								required
								aria-invalid={!!fieldErrors.title}
							/>
							<FieldError>{fieldErrors.title}</FieldError>
						</Field>
						<FieldGroup className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
							<Field>
								<FieldLabel htmlFor='dueDate'>Due Date</FieldLabel>
								<Input
									id='dueDate'
									type='date'
									value={dueDate}
									onChange={(e) => {setDueDate(e.target.value)}}
									placeholder='When is it due?'
								/>
							</Field>
							<Field>
								<FieldLabel htmlFor='list'>List</FieldLabel>
								<Select 
									items={selectItems} 
									defaultValue={selectItems[0].value} 
									onValueChange={(value) => setListId(value)} 
									>
									<SelectTrigger>
										<SelectValue placeholder='Select a list' />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											{selectItems.map((item) => (
												<SelectItem key={item.value} value={item.value}>
													<span>{item.icon}</span>
													{item.label}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							</Field>
						</FieldGroup>
					</FieldGroup>
				</FieldSet>
				<DialogFooter>
					<DialogClose disabled={isSubmitting} render={<Button variant='ghost'>Cancel</Button>}/>
					<Button	onClick={handleSubmit} disabled={isSubmitting || !title.trim()}>
            {'Create Task'}
          </Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default CreateTaskDialog