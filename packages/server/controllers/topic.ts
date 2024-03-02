import { type Handler, type RequestHandler } from 'express'
import { RESPONSE_MESSAGES } from '../constants'
import { RequestError, NotFoundError } from '../errors'
import { type RequestWithUserInfo } from '../middleware/auth.middleware'
import { Topic, Comment, User } from '../models'

const { invalidSaving } = RESPONSE_MESSAGES[400].topics
const { notFoundTopicId } = RESPONSE_MESSAGES[404].topics

interface TopicPropsFromClient {
  title: string
  text: string
}

export const getAllTopics: Handler = async (_, res, next) => {
  try {
    const topics = await Topic.findAll({
      order: [['updatedAt', 'DESC']],
      include: [
        {
          model: Comment,
          order: [['createdAt', 'DESC']],
        },
        {
          model: User,
          attributes: ['login'],
        },
      ],
    })
    res.status(200).json(topics)
  } catch (error) {
    next(error)
  }
}

export const getTopic: Handler = async (req, res, next) => {
  try {
    const { topicId } = req.params
    const topic = await Topic.findOne({
      where: { id: topicId },
      include: [
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['login'],
            },
          ],
        },
      ],
      order: [[{ model: Comment, as: 'comments' }, 'createdAt', 'DESC']],
    })
    if (!topic) {
      throw new NotFoundError(notFoundTopicId, 'NotFoundError')
    }
    res.status(200).json(topic.toJSON())
  } catch (error) {
    next(error)
  }
}

export const createTopic: Handler = async (req: RequestWithUserInfo, res, next) => {
  try {
    const { title, text } = req.body as TopicPropsFromClient
    const { id } = req.userInfo!
    if (!title || !text) {
      throw new RequestError(invalidSaving, 'RequestError')
    }
    const topic: Topic = await Topic.create({
      title,
      text,
      user_id: id,
    })
    res.status(201).json(topic.toJSON())
  } catch (error) {
    next(error)
  }
}

export const getAllCommentsInTopic: RequestHandler = async (req, res, next) => {
  try {
    const { topicId } = req.params
    const comments = await Comment.findAll({
      where: { topic_id: topicId },
      order: [['createdAt', 'DESC']],
    })
    res.status(200).json(comments)
  } catch (error) {
    next(error)
  }
}
