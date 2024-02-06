import { Router } from 'express'
import { ReplyController } from '../controllers'

const replyRouter = Router()

replyRouter.get('/:replyId', ReplyController.getReply)
replyRouter.post('/', ReplyController.addReply)
replyRouter.put('/:replyId/like', ReplyController.like)
replyRouter.delete('/:replyId', ReplyController.deleteReply)

export { replyRouter }
