import { Request, Response, NextFunction } from 'express'
import { ZodType } from 'zod'

export function validate(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body)

    if (!parsed.success) {
      return res.status(422).json({ errors: parsed.error.issues })
    }

    req.body = parsed.data
    next()
  }
}