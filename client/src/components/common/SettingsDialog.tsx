import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

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

import { Switch } from '@/components/ui/switch'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'

interface Props {
	trigger?: React.ReactElement
}

function SettingsDialog({ trigger }: Props){
  const { theme, setTheme } = useTheme()

	return(
		<Dialog>
			<DialogTrigger className='w-full'>
				{trigger}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Settings</DialogTitle>
					<DialogDescription>Customize your Rocket Tasks experience.</DialogDescription>
				</DialogHeader>
				<FieldGroup>
					<Field orientation={'horizontal'} className='justify-between items-baseline'>
						<div className='flex gap-3'>
							<div className='flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary'>
								{theme === 'dark' ? <Moon className='size-5' /> : <Sun className='size-5' />}
							</div>
							<div>
								<FieldTitle>Dark mode</FieldTitle>
								<FieldDescription>Switch between light and dark theme.</FieldDescription>
							</div>
						</div>
						<Switch 
							checked={(theme === 'dark')}
							onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
						/>
					</Field>
				</FieldGroup>
			</DialogContent>
		</Dialog>
	)
}

export default SettingsDialog