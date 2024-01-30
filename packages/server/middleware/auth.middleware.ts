import type { Request, Response, NextFunction } from 'express'

// Дописать для авторизации по куке
export const authMiddleware = (request: Request, _response: Response, next: NextFunction) => {
  const { cookie } = request.headers
  const urlYandexApi = `https://ya-praktikum.tech/`

  if (!cookie) {
    next()
    return
  }

  fetch(`${urlYandexApi}/api/v2/auth/user`, {
    headers: { 'Content-Type': 'application/json; charset=utf-8', cookie: cookie.toString() },
  })

  next()
}
