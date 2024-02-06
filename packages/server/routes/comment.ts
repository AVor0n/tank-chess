import { Router } from 'express'
import { CommentController } from '../controllers'

const commentRouter = Router()

commentRouter.get('/:commentId', CommentController.getComment)
commentRouter.post('/', CommentController.createComment)
commentRouter.put('/:commentId/like', CommentController.like)
commentRouter.delete('/:commentId', CommentController.deleteComment)

export { commentRouter }
