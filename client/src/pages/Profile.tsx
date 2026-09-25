import { useRouteLoaderData } from 'react-router'
import type { appLoader } from '@/routes/loaders/appLoader'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

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

import { Input } from '@/components/ui/input'

import { Button } from '@/components/ui/button'

import { Save } from 'lucide-react'
import { useState } from 'react'

import { updateMe } from '@/services/api/users'
import { toast } from 'sonner'
import { normalizeErrors } from '@/utils/normalizeErrors'
import { isAxiosError } from 'axios'

import { useRevalidator, Link } from 'react-router'
import { DeleteUserDialog } from '@/components/common/DeleteUserDialog'

function ProfilePage() {
  const { user } = useRouteLoaderData<typeof appLoader>('app')!

  const { revalidate } = useRevalidator()
  
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [isFetching, setIsFetching] = useState(false)

  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl)
  const [name, setName] = useState(user.name)

  const clearError = (key: string) => {
		setFieldErrors((prev) => ({
			...prev,
			[key]: '',
		}))
	}

  const handleSubmit = async () =>{
    setIsFetching(true)
    setFieldErrors({})
    
    try {
      await updateMe(avatarUrl || null, name)
      revalidate()
      toast.success('Profile updated successfully!')
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 422) {
        const errors = normalizeErrors(error.response.data)

        setFieldErrors(errors)
        return
      }

      toast.error('Could not update the profile.')
    } finally {
      setIsFetching(false)
    }
  }

  return (
    <div className='mx-auto w-full max-w-md space-y-9'>
      <div className='flex items-center gap-4'>
        <Avatar className={'size-16'}>
          <AvatarImage src={user.avatarUrl ?? undefined} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className='text-lg font-semibold'>Profile</CardTitle>
          <CardDescription>Update your name, e-mail and avatar.</CardDescription>
        </div>
      </div>
      <Card>
        <CardContent>
          <FieldSet disabled={isFetching}>
            <FieldLegend>Account details</FieldLegend>
            <FieldDescription>Changes are saved instantly to your profile.</FieldDescription>
            <FieldGroup>
              <Field data-invalid={!!fieldErrors.avatarUrl}>
                <FieldLabel htmlFor='avatarUrl'>Avatar URL</FieldLabel>
                <Input 
                  id='avatarUrl'
                  placeholder='https://...'
                  value={avatarUrl ?? ''}
                  aria-invalid={!!fieldErrors.avatarUrl}
                  onChange={(e) => {
                    setAvatarUrl(e.target.value)
                    clearError('avatarUrl')
                  }}
                />
                <FieldDescription>Paste an image URL to use as your avatar.</FieldDescription>
                <FieldError>{fieldErrors.avatarUrl}</FieldError>
              </Field>
              <Field data-invalid={!!fieldErrors.name}>
                <FieldLabel htmlFor='name'>Name</FieldLabel>
                <Input 
                  id='name' 
                  value={name} 
                  aria-invalid={!!fieldErrors.name}
                  maxLength={100}
                   onChange={(e) => {
                    setName(e.target.value)
                    clearError('name')
                  }}
                />
                <FieldError>{fieldErrors.name}</FieldError>
              </Field>
            </FieldGroup>
          </FieldSet>
        </CardContent>
        <CardFooter className={'flex justify-end'}>
          <Button onClick={handleSubmit} disabled={isFetching}>
            <Save/>
            Save Changes
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardContent>
         <FieldSet disabled={isFetching}>
            <FieldLegend>Security</FieldLegend>
            <FieldDescription>Manage your password and account access.</FieldDescription>
            <FieldGroup>
              <Field orientation={'horizontal'} className='justify-between'>
                <div>
                  <FieldLabel>Change password</FieldLabel>
                  <FieldDescription>Update your password to keep your account secure.</FieldDescription>
                </div>
                <Link to='/profile/change-password'>
                  <Button variant={'outline'}>Change Password</Button>
                </Link>
              </Field>

              <Field orientation={'horizontal'} className='justify-between'>
                <div>
                  <FieldLabel>Delete account</FieldLabel>
                  <FieldDescription>Permanently delete your account.</FieldDescription>
                </div>
                <DeleteUserDialog trigger={
                  <Button variant={'destructive'}>Delete Account</Button>
                }/>
              </Field>
            </FieldGroup>
          </FieldSet>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProfilePage