import { cn } from '@/lib/utils'
import { LIST_COLORS } from '@/constants/listColors'

interface Props {
  value: string
  onChange: (color: string) => void
}

export function ColorPicker({ value, onChange }: Props) {
  return (
    <div className='flex flex-wrap gap-2'>
      {LIST_COLORS.map((color) => (
        <button
          key={color}
          type='button'
          aria-label={`Pick color ${color}`}
          aria-pressed={value === color}
          onClick={() => onChange(color)}
          className={cn(
            'h-7 w-7 rounded-full border-2 transition-transform cursor-pointer',
            value === color
              ? 'scale-110 border-foreground'
              : 'border-transparent',
          )}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  )
}