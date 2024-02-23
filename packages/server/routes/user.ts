import { Router } from 'express'
import { UserController } from '../controllers'

const userRouter = Router()

userRouter.get('/theme', UserController.getTheme)
userRouter.post('/theme', UserController.setTheme)
userRouter.get('/user', UserController.getAndSaveUser)
userRouter.post('/user', UserController.findUser)
export { userRouter }
