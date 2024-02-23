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

export interface RequestWithUserInfo extends Request {
  userInfo?: UserInfo
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

  /* await setTimeout(()=>console.log(1), 1)
  request.userInfo = {
    id: 123,
    first_name: 'кри',
    second_name: 'кри',
    display_name: 'kri',
    login: 'kri',
    avatar: null,
    email: 'kri@kri.ru',
    phone: '948549549854'
    }*/
}
