import cookieParser from 'cookie-parser'
import express, { Router } from 'express'
import { commentRouter } from './comment'
import { reactionRouter } from './reaction'
import { replyRouter } from './reply'
import { topicRouter } from './topic'

//import { ReactionController } from '../controllers'

const apiRoutes = Router()

apiRoutes.use([express.json(), cookieParser()])

apiRoutes.use('/topics', topicRouter)
apiRoutes.use('/comments', commentRouter)
apiRoutes.use('/replies', replyRouter)
apiRoutes.use('/reactions', reactionRouter)

export { apiRoutes }
