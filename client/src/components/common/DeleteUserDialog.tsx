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

import { toast } from 'sonner'
import { queryClient } from '@/lib/queryClient'
import { useNavigate } from 'react-router'
import { deleteMe } from '@/services/api/users'
import { removeToken } from '@/services/auth/storage'

interface Props {
	trigger: React.ReactElement
}

export function DeleteUserDialog({ trigger }:Props){

	const navigate = useNavigate()

	const [isSubmitting, setIsSubmitting] = useState(false)
	const [open, setOpen] = useState(false)

	const handleSubmit = async () => {
		setIsSubmitting(true)
		
		try {
			await deleteMe()
			setOpen(false)
			removeToken()
			queryClient.clear()
			navigate('/login')
		} catch {
    	toast.error('Could not delete your account.')		
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger render={trigger}/>
			<AlertDialogContent >
				<AlertDialogHeader>
					 <AlertDialogMedia className='bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive'>
            <Trash2Icon />
          </AlertDialogMedia>
					<AlertDialogTitle>{'Delete account?'}</AlertDialogTitle>
					<AlertDialogDescription>{'This action is permanent. Your account and all associated data will be deleted and cannot be recovered.'}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={isSubmitting}>{'Cancel'}</AlertDialogCancel>
					<AlertDialogAction disabled={isSubmitting} variant={'destructive'} onClick={handleSubmit}>{'Delete account'}</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}