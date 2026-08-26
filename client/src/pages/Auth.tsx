import {Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Rocket } from 'lucide-react'
import { useEffect, useState } from 'react'
import { isSessionExpired, removeSessionExpired } from '@/services/auth/storage'
import {Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet, FieldError, FieldContent, FieldTitle} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { login, register } from '@/services/api/auth'
import { useNavigate } from 'react-router'
import { isAxiosError } from 'axios'
import { normalizeErrors } from '@/utils/normalizeErrors'

type AuthPageSection = 'login' | 'register'

interface Props {
	initSection?: AuthPageSection
}
	
function AuthPage({ initSection = 'login' }: Props) {

	const navigate = useNavigate()
	const [section, setSection] = useState<AuthPageSection>(initSection)

	const [name, setName] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

	const [isFetching, setIsFetching] = useState<boolean>(false)

	const toggleSection = () => {
  	setSection((prev) => (prev === 'login' ? 'register' : 'login'))
		setName('')
		setEmail('')
		setPassword('')
		setFieldErrors({})
	}

	const isFormValid = (): boolean => {
		switch (section) {
			case 'login':
				return (
					email.trim() !== '' &&
					password.trim() !== ''
				)

			case 'register':
				return (
					name.trim() !== '' &&
					email.trim() !== '' &&
					password.trim() !== ''
				)

			default:
				return false
		}
	}
	const clearError = (key: string) => {
		setFieldErrors((prev) => ({
			...prev,
			[key]: '',
		}))
	}

	const handleLogin = async () => {
		setFieldErrors({})
		setIsFetching(true)
		try {
			await login(email, password)
			navigate('/')
		} catch (error) {
			if (isAxiosError(error) && error.response?.status === 422) {
				const errors = normalizeErrors(error.response.data)

				setFieldErrors(errors)
				return
			}
			if (isAxiosError(error) && error.response?.status === 401) {
				toast.error(error.response.data.message)
				return
			}
		} finally {
			setIsFetching(false)
		}
	}
	
	const handleRegister = async () => {
		setFieldErrors({})
		setIsFetching(true)
		try {
			await register(name, email, password)
			navigate('/')
		} catch (error) {
			if (isAxiosError(error) && error.response?.status === 422) {
				const errors = normalizeErrors(error.response.data)

				setFieldErrors(errors)
				return
			}
		} finally {
			setIsFetching(false)
		}
	}
	
	useEffect(() => {
		if (!isSessionExpired()) return

		removeSessionExpired()

		requestAnimationFrame(() => {
			toast.error('Session expired. Please sign in again.')
		})
	}, [])

	const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
			e.preventDefault()

		if (section === 'login') {
			handleLogin()
		} else {
			handleRegister()
		}
	}

	return(
    <div className='min-h-screen flex items-center justify-center p-4'>
			<Card className='mx-auto w-full max-w-md gap-4'>

				<CardHeader className='items-center text-center'>
					<div className='mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary text-center'>
						<Rocket/>
					</div>
					<CardTitle className='text-2xl'>{section === 'login' ? 'Welcome back' : 'Create your account'}</CardTitle>
          <CardDescription>{section === 'login' ? 'Sign in to your Rocket Tasks account' : 'Start organizing your tasks in seconds'}</CardDescription>
				</CardHeader>

				<CardContent className='space-y-3'>
					<form onSubmit={handleSubmit} className='space-y-3'>
						<FieldSet  disabled={isFetching }>
							<FieldGroup>
								{section !== 'login' &&(
									<Field  data-invalid={!!fieldErrors.name}>
										<FieldLabel htmlFor='name'>Name</FieldLabel>
										<Input id='name' type='text' placeholder='John Doe' required value={name} aria-invalid={!!fieldErrors.name} 
											onChange={(e) => {
												setName(e.target.value)
												clearError('name')
											}}
										/>
										<FieldError>{fieldErrors.name}</FieldError>
									</Field>
								)}
								<Field  data-invalid={!!fieldErrors.email}>
									<FieldLabel htmlFor='email'>Email</FieldLabel>
									<Input id='email' type='email' placeholder='you@example.com' required value={email} aria-invalid={!!fieldErrors.email} 
										onChange={(e) => {
											setEmail(e.target.value)
											clearError('email')
										}}
									/>
									<FieldError>{fieldErrors.email}</FieldError>
								</Field>
								<Field  data-invalid={!!fieldErrors.password}>
									<FieldLabel htmlFor='password'>Password</FieldLabel>
									<Input id='password' type='password' placeholder='••••••••' required value={password} aria-invalid={!!fieldErrors.password} 
										onChange={(e) => {
											setPassword(e.target.value)
											clearError('password')
										}}
									/>
									<FieldError>{fieldErrors.password}</FieldError>
								</Field>
							</FieldGroup>
						</FieldSet>
						<Button
							type='submit'
							className='w-full'
							size='lg'
							disabled={isFetching || !isFormValid()}
						>
							{section === 'login' ? 'Sign in' : 'Create account'}
						</Button>
					</form>
				</CardContent>

				<CardFooter className='flex justify-center text-center'>
					<p>{section === 'login' ? "Don't have an account?" : 'Already have an account?'}</p>
					<CardAction>
						<Button onClick={toggleSection} variant={'link'} className={'px-1'} disabled={isFetching}>
							{section === 'login' ? 'Create one' : 'Sign in'}
						</Button>
					</CardAction>
				</CardFooter>

			</Card>
		</div>
	)
}

export default AuthPage