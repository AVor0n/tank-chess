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

    await User.sequelize?.transaction({}, async tr => {
      const user = await User.findOne({
        lock: tr?.LOCK.UPDATE,
        where: {
          login: login,
        },
        transaction: tr,
      })
      await user?.update({ theme })
    })

    res.status(200).send({ login, theme })
  } catch (error) {
    next(error)
  }
}

export const getAndSaveUser: Handler = async (req: RequestWithUserInfo, res, next) => {
  try {
    if (!req.userInfo?.id) res.status(400).send({ message: 'Пользователь не найден' })
    else {
      const { id, login, email, first_name, second_name, display_name, phone, avatar } = req.userInfo
      //const { theme } = req.body as ThemePayload
      const theme = 'light'
      if (!id || !login || !email) res.status(400).send({ reason: 'Заданы не все обязательные параметры' })
      else {
        const aboutUser = {
          _id: id,
          login,
          email,
          first_name,
          second_name,
          display_name: display_name ? display_name : ' ',
          phone,
          avatar: avatar ? avatar : ' ',
          theme: theme,
        }
        await User.upsert(aboutUser)
      }
      const users = await User.findAll()
      console.log('============')
      console.log(users)
      res.status(200).send(req.userInfo)
    }
  } catch (error) {
    res.status(400).send({ message: ' Что-то пошло не так. Пользователь не найден' })
    next(error)
  }
}

export const findUser: Handler = async (req, res, _) => {
  try {
    const { id } = req.params
    if (!id) res.status(400).send({ reason: 'Не определен ID пользователя' })
    else {
      const userInfo = await User.findOne({
        where: { _id: id },
      })
      res.status(200).send(userInfo)
    }
  } catch (error) {
    res.status(400).send({ reason: 'Ошибка при сохранении пользователя в БД' })
  }
}
