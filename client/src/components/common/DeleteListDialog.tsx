import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import { Trash2Icon } from 'lucide-react'

import { useState } from 'react'

import { deleteList } from '@/services/api/lists'

import { toast } from 'sonner'
import { queryClient } from '@/lib/queryClient'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router'

interface Props {
	trigger: React.ReactNode
	listId: string
}

export function DeleteListDialog({ trigger, listId}:Props){

	const { id: paramListId } = useParams()
	const navigate = useNavigate()

	const [isSubmitting, setIsSubmitting] = useState(false)
	const [open, setOpen] = useState(false)

	const handleSubmit = async () => {
		const shouldNavigate = paramListId === listId

		setIsSubmitting(true)
		
		try {
			await deleteList(listId)
			toast.success('List deleted successfully!')
			await Promise.all([
				queryClient.invalidateQueries({ queryKey: ['lists'] }),
				queryClient.invalidateQueries({ queryKey: ['tasks'] }),
			])
			setOpen(false)
			
			if (shouldNavigate) {
				navigate('/')
			}
		} catch ( error ){
    	toast.error('Could not delete the list.')		
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger className={'w-full'}>
				{trigger}
			</AlertDialogTrigger>
			<AlertDialogContent >
				<AlertDialogHeader>
					 <AlertDialogMedia className='bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive'>
            <Trash2Icon />
          </AlertDialogMedia>
					<AlertDialogTitle>{'Are you sure you want to delete this list?'}</AlertDialogTitle>
					<AlertDialogDescription>{'This will permanently delete the list and all tasks in it. This action cannot be undone.'}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={isSubmitting}>{'Cancel'}</AlertDialogCancel>
					<AlertDialogAction disabled={isSubmitting} variant={'destructive'} onClick={handleSubmit}>{'Delete list'}</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}