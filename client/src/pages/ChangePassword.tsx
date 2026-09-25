import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useState } from 'react'
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { updatePassword } from '@/services/api/users'
import { isAxiosError } from 'axios'
import { normalizeErrors } from '@/utils/normalizeErrors'
import { useNavigate } from 'react-router'

function ChangePasswordPage() {
	const navigate = useNavigate()

	const [currentPassword, setCurrentPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [confirmNewPassword, setConfirmNewPassword] = useState('')

	const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
	const [isSubmitting, setIsSubmitting] = useState(false)

	const clearError = (key: string) => {
		setFieldErrors((prev) => ({
			...prev,
			[key]: '',
		}))
	}

	const handleSubmit = async () => {
		setFieldErrors({})

		if (newPassword !== confirmNewPassword) {
			setFieldErrors({
				confirmNewPassword: 'Passwords do not match.',
			})
			return
		}
		
		setIsSubmitting(true)

		try {
			await updatePassword(currentPassword, newPassword)

			toast.success('Password updated successfully.')
			navigate('/profile')
		} catch (error) {
			if (isAxiosError(error) && error.response?.status === 400) {
				setFieldErrors({
					currentPassword: error.response.data.message,
				})
				return
			}

			if (isAxiosError(error) && error.response?.status === 422) {
				const errors = normalizeErrors(error.response.data)

				setFieldErrors(errors)
				return
			}

			toast.error('Could not update your password.')
		}	finally {
			setIsSubmitting(false)
		}
	}

	const isFormValid =
		currentPassword.trim() !== '' &&
		newPassword.trim() !== '' &&
		confirmNewPassword.trim() !== ''

	return (
		<div className='min-h-screen flex items-center justify-center p-4'>
			<Card className='mx-auto w-full max-w-md'>
				<CardHeader className='flex justify-center'>
					<CardTitle className='text-lg'>Change Password</CardTitle>
				</CardHeader>
				<CardContent>
					<FieldSet disabled={isSubmitting}>
						<FieldGroup>
							<Field data-invalid={!!fieldErrors.currentPassword}>
								<FieldLabel htmlFor='currentPassword'>
									Current password
								</FieldLabel>
								<Input
									id='currentPassword'
									type='password'
									value={currentPassword}
									aria-invalid={!!fieldErrors.currentPassword}
									onChange={(e) => {
										setCurrentPassword(e.target.value)
										clearError('currentPassword')
									}}
								/>
								<FieldError>
									{fieldErrors.currentPassword}
								</FieldError>
							</Field>
							<Field data-invalid={!!fieldErrors.newPassword}>
								<FieldLabel htmlFor='newPassword'>
									New password
								</FieldLabel>
								<Input
									id='newPassword'
									type='password'
									value={newPassword}
									aria-invalid={!!fieldErrors.newPassword}
									onChange={(e) => {
										setNewPassword(e.target.value)
										clearError('newPassword')
										clearError('confirmNewPassword')
									}}
								/>
								<FieldError>
									{fieldErrors.newPassword}
								</FieldError>
							</Field>
							<Field data-invalid={!!fieldErrors.confirmNewPassword}>
								<FieldLabel htmlFor='confirmNewPassword'>
									Confirm new password
								</FieldLabel>
								<Input
									id='confirmNewPassword'
									type='password'
									value={confirmNewPassword}
									aria-invalid={!!fieldErrors.confirmNewPassword}
									onChange={(e) => {
										setConfirmNewPassword(e.target.value)
										clearError('confirmNewPassword')
									}}
								/>
								<FieldError>
									{fieldErrors.confirmNewPassword}
								</FieldError>
							</Field>
						</FieldGroup>
					</FieldSet>
				</CardContent>
				<CardFooter>
					<Button
						className='w-full'
						type='button'
						disabled={isSubmitting || !isFormValid}
						onClick={handleSubmit}
					>
						{isSubmitting ? 'Changing password...' : 'Change password'}
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}

export default ChangePasswordPage