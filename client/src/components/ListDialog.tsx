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

import { ColorPicker } from '@/components/ColorPicker'
import { LIST_COLORS } from '@/constants/listColors'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface Props {
  variant: 'create' | 'edit'
  trigger: React.ReactNode
}

export function ListDialog({ variant, trigger }: Props) {

  const [open, setOpen] = useState(false)
	const dialogTitle = variant === 'create' ? 'Create a new list' : 'Edit list'
	const submitLabel = variant === 'create' ? 'Create List' : 'Save changes'

	const [color, setColor] = useState(LIST_COLORS[0])
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')

	return (
		<Dialog open={open} >
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
							<p>{description}</p>
						</Field>
						<Field>
							<FieldLabel>Color</FieldLabel>
							<ColorPicker
								value={color}
								onChange={setColor}
							/>
							<p>{color}</p>
						</Field>
					</FieldGroup>
				</FieldSet>
				<DialogFooter>
					<DialogClose render={<Button variant='ghost'>Cancel</Button>}/>
					<Button disabled={!title.trim()}>
            {submitLabel}
          </Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}