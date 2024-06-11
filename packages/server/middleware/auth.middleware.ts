import { type Request, type Response, type NextFunction } from 'express'

export interface UserInfo {
  id: number
  first_name: string
  second_name: string
  display_name: string | null
  login: string
  avatar: string | null
  email: string
  phone: string
}

export interface RequestWithUserInfo<T = unknown> extends Request {
  userInfo?: UserInfo
  body: T
}

export const authMiddleware = async (request: RequestWithUserInfo, _response: Response, next: NextFunction) => {
  const cookie = request.header('cookie')
  if (!cookie || request.url.includes('.')) {
    next()
    return
  }
  try {
    const user = await fetch('https://ya-praktikum.tech/api/v2/auth/user', {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        cookie,
      },
    })

    request.userInfo = (await user.json()) as UserInfo
    next()
  } catch (error) {
    next()
  }
}
