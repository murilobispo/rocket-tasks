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
import { createList } from '@/services/api/lists'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'
import { queryClient } from '@/lib/queryClient'

interface Props {
  variant: 'create' | 'edit'
  trigger: React.ReactNode
}

export function ListDialog({ variant, trigger }: Props) {
	
	const navigate = useNavigate()
	const [open, setOpen] = useState(false)
	const dialogTitle = variant === 'create' ? 'Create a new list' : 'Edit list'
	const submitLabel = variant === 'create' ? 'Create List' : 'Save changes'
	const [isSubmitting, setIsSubmitting] = useState(false)

	const [title, setTitle] = useState('')
	const [color, setColor] = useState(LIST_COLORS[0])
	const [description, setDescription] = useState('')

	const clearFields = () =>{
		setTitle('')
		setColor(LIST_COLORS[0])
		setDescription('')
	}

	const handleSubmit = async () => {
		setIsSubmitting(true)

		try {
			if (variant === 'create') {
				await handleCreateList()
			} else if (variant === 'edit') {
				await handleEditList()
			}
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleEditList = async () => {
		console.log('edit list')
	}

	const handleCreateList = async () => {
		try {
			const list = await createList(title, color, description)
			toast.success('Lista criada com sucesso!')
			await queryClient.invalidateQueries({ queryKey: ['lists'] })
			setOpen(false)
			navigate(`/list/${list.id}`)
		} catch ( error ){
    	toast.error('Não foi possível criar a lista.')			
		} 
	}

	return (
		<Dialog open={open} onOpenChange={(o) => {
			setOpen(o)
			clearFields()
		}}>
			<DialogTrigger>
        {trigger}
      </DialogTrigger>
			<DialogContent>
				<DialogHeader>
          <DialogTitle>{ dialogTitle }</DialogTitle>
          <DialogDescription>Group related tasks together.</DialogDescription>
        </DialogHeader>
				<FieldSet>
					<FieldGroup>
						<Field>
							<FieldLabel htmlFor='title'>Title</FieldLabel>
							<Input 
								id='title' 
								value={title} 
								onChange={(e) => setTitle(e.target.value)}
								placeholder='e.g. Travel plans' 
								maxLength={100} 
							/>
						</Field>
						<Field>
							<FieldLabel htmlFor='description'>Description</FieldLabel>
							<Textarea 
								id='description' 
								value={description}
              	onChange={(e) => setDescription(e.target.value)}
								placeholder='Optional — what is this list about?' 
								maxLength={255} 
								className='max-h-48' 
							/>
						</Field>
						<Field>
							<FieldLabel>Color</FieldLabel>
							<ColorPicker
								value={color}
								onChange={setColor}
							/>
						</Field>
					</FieldGroup>
				</FieldSet>
				<DialogFooter>
					<DialogClose render={<Button variant='ghost'>Cancel</Button>}/>
					<Button onClick={handleSubmit} disabled={isSubmitting || !title.trim()}>
            {submitLabel}
          </Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}