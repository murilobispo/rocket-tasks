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

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  confirmLabel?: string
  onConfirm?: () => void | Promise<void>
}

export function DeleteDialog({ 
	open,
	onOpenChange,
	title = 'Are you absolutely sure?', 
	description = 'This action cannot be undone.', 
	onConfirm
	}:Props
	){
	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent size='sm'>
				<AlertDialogHeader>
					 <AlertDialogMedia className='bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive'>
            <Trash2Icon />
          </AlertDialogMedia>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={onConfirm} variant={'destructive'}>{'Delete'}</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}