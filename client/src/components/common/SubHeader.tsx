import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

interface SubHeaderProps {
  title: string
  subtitle?: string
  onClick?: () => void
}

export function SubHeader({
  title,
  subtitle,
  onClick,
}: SubHeaderProps) {
  return (
    <div className='flex items-center justify-between gap-4'>
			<div className='min-w-0'>
        <h2 className='text-4xl font-semibold tracking-tight truncate whitespace-nowrap'>
          {title}
        </h2>

        {subtitle && (
          <p className='mt-1 text-base text-muted-foreground'>
            {subtitle}
          </p>
        )}
      </div>

      {onClick && (
        <Button
          size='lg'
          className='gap-2 shadow-sm px-5'
          onClick={onClick}
        >
          <Plus className='h-4 w-4' />
          New task
        </Button>
      )}
    </div>
  )
}