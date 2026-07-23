import { Response } from 'express'

const REALM = 'rocket-tasks'

type BearerErrorCode = 'invalid_request' | 'invalid_token' | 'insufficient_scope'

export function sendBearerError(res: Response, error: BearerErrorCode, description: string) {
  return res
    .status(401)
    .set('WWW-Authenticate', `Bearer realm="${REALM}", error="${error}", error_description="${description}"`)
    .json({ message: description })
}