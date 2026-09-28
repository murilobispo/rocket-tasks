import { House, Rocket, User } from 'lucide-react'
import { isRouteErrorResponse, Link, useRouteError } from 'react-router'

import { Button } from '@/components/ui/button'

export default function ErrorPage() {
  const error = useRouteError()

  let code = ''
  let message = ''

  if (isRouteErrorResponse(error)) {
    code = error.status.toString()
    message = error.statusText

    if (error.status === 404) {
      message =
        "The page you're looking for drifted off course or doesn't exist. Let's get your mission back on track."
    }
  } else if (error instanceof Error) {
    message = error.message
  }

  return (
    <div className='flex justify-center items-center min-h-screen text-center'>
      <div className='flex flex-col justify-center items-center gap-3 max-w-md'>
        <span className='flex size-20 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20 animate-float'>
            <Rocket className='size-10 text-primary'/>
        </span>
        <p className='font-heading text-xs font-semibold uppercase tracking-[0.2em] text-primary'>
          {`Error ${code}`}
        </p>
        <h1 className='font-heading text-4xl font-bold tracking-tight'>
          Lost in space
        </h1>
        <p className='text-sm text-muted-foreground'>
          {message}
        </p>
        <div className='mt-6 flex flex-wrap justify-center gap-2'>
          <Link to='/'>
            <Button>
              <House />
              Back to home
            </Button>
          </Link>
          <Link to='/profile'>
            <Button variant='outline'>
              <User />
              My profile
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}