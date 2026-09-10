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
} from "@/components/ui/field"

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { ColorPicker } from '@/components/common/ColorPicker'
import { LIST_COLORS } from '@/constants/listColors'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { createList} from '@/services/api/lists'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'
import { queryClient } from '@/lib/queryClient'

import { isAxiosError } from 'axios'
import { normalizeErrors } from '@/utils/normalizeErrors'

interface Props {
  trigger: React.ReactElement
}

export function CreateListDialog({ trigger }: Props) {
	
	const navigate = useNavigate()
	const [open, setOpen] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)

	const [title, setTitle] = useState('')
	const [color, setColor] = useState(LIST_COLORS[0])
	const [description, setDescription] = useState('')

	const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
	
	const clearError = (key: string) => {
		setFieldErrors((prev) => ({
			...prev,
			[key]: '',
		}))
	}

	const clearFields = () =>{
		setTitle('')
		setColor(LIST_COLORS[0])
		setDescription('')
	}

	const handleSubmit = async () => {
		setFieldErrors({})
		setIsSubmitting(true)

		try {
			const list = await createList(title, color, description)

			await queryClient.invalidateQueries({
				queryKey: ['lists'],
			})

			toast.success('List created successfully!')

			setOpen(false)
			navigate(`/list/${list.id}`)
		} catch (error) {
			if (isAxiosError(error) && error.response?.status === 422) {
				const errors = normalizeErrors(error.response.data)

				setFieldErrors(errors)
				return
			}

			toast.error('Could not create the list.')
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
          <DialogTitle>{'Create a new list'}</DialogTitle>
          <DialogDescription>Group related tasks together.</DialogDescription>
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
								placeholder='e.g. Travel plans'
								maxLength={100}
								required
								aria-invalid={!!fieldErrors.title}
							/>

							<FieldError>{fieldErrors.title}</FieldError>
						</Field>
						<Field data-invalid={!!fieldErrors.description}>
							<FieldLabel htmlFor='description'>
								Description
							</FieldLabel>

							<Textarea
								id='description'
								value={description}
								onChange={(e) => {
									setDescription(e.target.value)
									clearError('description')
								}}
								placeholder='Optional — what is this list about?'
								maxLength={255}
								className='max-h-48'
								aria-invalid={!!fieldErrors.description}
							/>

							<FieldError>{fieldErrors.description}</FieldError>
						</Field>
						<Field data-invalid={!!fieldErrors.color}>
						<FieldLabel>{'Color'}</FieldLabel>

						<ColorPicker
							value={color}
							onChange={(value) => {
								setColor(value)
								clearError('color')
							}}
						/>

						<FieldError>{fieldErrors.color}</FieldError>
					</Field>
					</FieldGroup>
				</FieldSet>
				<DialogFooter>
					<DialogClose disabled={isSubmitting} render={<Button variant='ghost'>Cancel</Button>}/>
					<Button onClick={handleSubmit} disabled={isSubmitting || !title.trim()}>
            {'Create List'}
          </Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}