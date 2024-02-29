import { Router } from 'express'
import { ReactionController } from '../controllers'

const reactionRouter = Router()

reactionRouter.get('/:limit', ReactionController.getAllEmoji)
reactionRouter.get('/comment/:commentId', ReactionController.getReactionsOnComment)
reactionRouter.post('/comment/reaction', ReactionController.doReaction)

export { reactionRouter }
