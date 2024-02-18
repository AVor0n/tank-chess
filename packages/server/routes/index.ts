import express, { Router } from 'express'
import { commentRouter } from './comment'
import { reactionRouter } from './reaction'
import { topicRouter } from './topic'
import { userRouter } from './user'

const apiRoutes = Router()

apiRoutes.use([express.json()])

apiRoutes.use('/topics', topicRouter)
apiRoutes.use('/comments', commentRouter)
apiRoutes.use('/reactions', reactionRouter)
apiRoutes.use('/users', userRouter)

export { apiRoutes }
