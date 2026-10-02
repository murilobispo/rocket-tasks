export interface normalizedErrors {
  formErrors: string[]
  fieldErrors: Record<string, string[]>
}

export function normalizeErrors(
  errors: normalizedErrors
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(errors.fieldErrors).map(([key, messages]) => [
      key,
      messages[0] ?? '',
    ])
  )
}
