import { type Handler } from 'express'
import { type RequestWithUserInfo } from '../middleware/auth.middleware'
import { User } from '../models'

interface ThemePayload {
  theme: string
  login: string
}

export const getTheme: Handler = async (req: RequestWithUserInfo, res, next) => {
  try {
    const login = req.userInfo?.login
    if (!login) {
      res.status(400).send({ reason: 'Not provided login' })
      return
    }

    const user = await User.findByPk(login)
    res.status(200).send({ theme: user?.theme ?? 'light' })
  } catch (error) {
    next(error)
  }
}

export const setTheme: Handler = async (req: RequestWithUserInfo, res, next) => {
  try {
    const login = req.userInfo?.login
    const { theme } = req.body as ThemePayload
    if (!login) {
      res.status(400).send({ reason: 'Not provided login' })
      return
    }
    if (!theme) {
      res.status(400).send({ reason: 'Not provided theme' })
      return
    }
    if (theme !== 'light' && theme !== 'dark') {
      res.status(400).send({ reason: 'Invalid theme value. Available: light, dark' })
      return
    }

    await User.upsert({ login, theme })
    res.send(200).send({ login, theme })
  } catch (error) {
    next(error)
  }
}
