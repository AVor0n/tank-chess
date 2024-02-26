import { type Handler } from 'express'
import { type RequestWithUserInfo } from '../middleware/auth.middleware'
import { User } from '../models'

interface ThemePayload {
  theme: string
  login: string
}

export const getTheme: Handler = async (req: RequestWithUserInfo, res, next) => {
  try {
    const id = req.userInfo?.id
    if (!id) {
      res.status(400).send({ reason: 'Not provided id' })
      return
    }

    const user = await User.findByPk(id)
    res.status(200).send({ theme: user?.theme ?? 'light' })
  } catch (error) {
    next(error)
  }
}

export const setTheme: Handler = async (req: RequestWithUserInfo, res, next) => {
  try {
    const id = req.userInfo?.id
    const { theme } = req.body as ThemePayload
    if (!id) {
      res.status(400).send({ reason: 'Not provided id' })
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
          _id: id,
        },
        transaction: tr,
      })
      await user?.update({ theme })
    })

    res.status(200).send({ id, theme })
  } catch (error) {
    next(error)
  }
}

export const getAndSaveUser: Handler = async (req: RequestWithUserInfo, res, next) => {
  try {
    if (!req.userInfo?.id) res.status(400).send({ message: 'Пользователь не найден' })
    else {
      const { id, login, email, first_name, second_name, display_name, phone, avatar } = req.userInfo
      const { theme } = req.body as ThemePayload
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
          theme: theme ? theme : 'light',
        }
        await User.upsert(aboutUser)
        res.status(200).send(req.userInfo)
      }
    }
  } catch (error) {
    next(error)
  }
}

export const findUserById: Handler = async (req, res, _) => {
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
