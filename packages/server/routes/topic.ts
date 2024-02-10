import { Router } from 'express'
import { TopicController } from '../controllers'

const topicRouter = Router()

topicRouter.get('/', TopicController.getAllTopics)
topicRouter.get('/:topicId', TopicController.getTopic)
topicRouter.post('/', TopicController.createTopic)
topicRouter.get('/:topicId/comments', TopicController.getAllCommentsInTopic)

export { topicRouter }
