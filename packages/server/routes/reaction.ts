import { Router } from 'express'
import { ReactionController } from '../controllers'

const reactionRouter = Router()

reactionRouter.get('/import', ReactionController.importEmojiFromJSON)
reactionRouter.post('/clear', ReactionController.clearEmoji)
reactionRouter.get('/:limit', ReactionController.getAllEmoji)
reactionRouter.get('/comment/:commentId', ReactionController.getReactionsOnComment)
reactionRouter.post('/comment/reaction', ReactionController.doReaction)

export { reactionRouter }
