import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import CreateTaskDialog from '@/components/common/CreateTaskDialog'

interface SubHeaderProps {
  title: string
  subtitle?: string
}

export function SubHeader({ title, subtitle }: SubHeaderProps) {
  return (
    <div className='flex items-center justify-between gap-4'>
			<div className='min-w-0'>
        <h2 className='text-3xl font-semibold tracking-tight truncate whitespace-nowrap'>
          {title}
        </h2>

        {subtitle && (
          <p className='mt-1 text-base text-muted-foreground'>
            {subtitle}
          </p>
        )}
      </div>

        <CreateTaskDialog trigger={
          <Button
            className='gap-2 shadow-sm px-5'
          >
            <Plus className='h-4 w-4' />
            New task
          </Button>
        }/>
    </div>
  )
}