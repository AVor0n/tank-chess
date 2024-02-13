import { NotFoundError, RequestError } from '../errors'
import type { Request, Response, NextFunction } from 'express'

const CUSTOM_ERRORS = ['RequestError', 'NotFoundError']
type ERROR_TYPES = typeof CUSTOM_ERRORS

export const errorMiddleware = (err: ERROR_TYPES, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof NotFoundError || err instanceof RequestError) {
    if (CUSTOM_ERRORS.includes(err.errorName)) {
      return res.status(err.status).send({ message: err.message })
    }
  }
  console.log(err)
  return res.status(500).send({ message: 'Internal Server Error!' })
}
