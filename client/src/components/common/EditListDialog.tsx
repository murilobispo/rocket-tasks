import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { ColorPicker } from '@/components/common/ColorPicker'
import { LIST_COLORS } from '@/constants/listColors'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { updateList } from '@/services/api/lists'
import { toast } from 'sonner'
import { queryClient } from '@/lib/queryClient'

import { isAxiosError } from 'axios'
import { normalizeErrors } from '@/utils/normalizeErrors'
import type { List } from '@/types/list'

interface Props {
  list: List
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditListDialog({
  list,
  open,
  onOpenChange,
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [title, setTitle] = useState(list.title)
  const [color, setColor] = useState(list.color ?? LIST_COLORS[0])
  const [description, setDescription] = useState(
    list.description ?? ''
  )

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    setTitle(list.title)
    setColor(list.color ?? LIST_COLORS[0])
    setDescription(list.description ?? '')
    setFieldErrors({})
  }, [list])

  const clearError = (key: string) => {
    setFieldErrors((prev) => ({
      ...prev,
      [key]: '',
    }))
  }

  const handleSubmit = async () => {
    setFieldErrors({})
    setIsSubmitting(true)

    try {
      await updateList(
        list.id,
        title,
        color,
        description
      )

      await Promise.all([
				queryClient.invalidateQueries({ queryKey: ['lists'] }),
				queryClient.invalidateQueries({ queryKey: ['tasks'] }),
			])

      toast.success('List updated successfully!')

      onOpenChange(false)
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 422) {
        const errors = normalizeErrors(error.response.data)

        setFieldErrors(errors)
        return
      }

      toast.error('Could not update the list.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit list</DialogTitle>
          <DialogDescription>
            Update the details of your list.
          </DialogDescription>
        </DialogHeader>

        <FieldSet>
          <FieldGroup>
            <Field data-invalid={!!fieldErrors.title}>
              <FieldLabel htmlFor="title">
                Title
              </FieldLabel>

              <Input
                id="title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                  clearError('title')
                }}
                placeholder="e.g. Travel plans"
                maxLength={100}
                required
                aria-invalid={!!fieldErrors.title}
              />

              <FieldError>
                {fieldErrors.title}
              </FieldError>
            </Field>

            <Field data-invalid={!!fieldErrors.description}>
              <FieldLabel htmlFor="description">
                Description
              </FieldLabel>

              <Textarea
                id="description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value)
                  clearError('description')
                }}
                placeholder="Optional — what is this list about?"
                maxLength={255}
                className="max-h-48"
                aria-invalid={!!fieldErrors.description}
              />

              <FieldError>
                {fieldErrors.description}
              </FieldError>
            </Field>

            <Field data-invalid={!!fieldErrors.color}>
              <FieldLabel>
                Color
              </FieldLabel>

              <ColorPicker
                value={color}
                onChange={(value) => {
                  setColor(value)
                  clearError('color')
                }}
              />

              <FieldError>
                {fieldErrors.color}
              </FieldError>
            </Field>
          </FieldGroup>
        </FieldSet>

        <DialogFooter>
          <DialogClose
            disabled={isSubmitting}
            render={
              <Button variant="ghost">
                Cancel
              </Button>
            }
          />

          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !title.trim()}
          >
            {isSubmitting ? 'Saving...' : 'Save changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
