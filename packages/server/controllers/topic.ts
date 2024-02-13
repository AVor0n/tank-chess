import { type Handler, type RequestHandler } from 'express'
import { RESPONSE_MESSAGES } from '../constants'
import { RequestError, NotFoundError } from '../errors'
import { Topic, Comment } from '../models'

const { invalidSaving } = RESPONSE_MESSAGES[400].topics
const { notFoundTopicId } = RESPONSE_MESSAGES[404].topics

interface TopicPropsFromClient {
  title: string
}

/* eslint-disable @typescript-eslint/no-misused-promises*/
export const getAllTopics: Handler = async (_, res, next) => {
  try {
    const topics = await Topic.findAll({
      order: [['createdAt', 'DESC']],
    })
    res.status(200).json({ topics })
  } catch (error) {
    next(error)
  }
}

export const getTopic: Handler = async (req, res, next) => {
  try {
    const { topicId } = req.params
    const topic = await Topic.findOne({
      where: { id: topicId },
    })
    if (!topic) {
      throw new NotFoundError(notFoundTopicId, 'NotFoundError')
    }

    res.status(200).json(topic.toJSON())
  } catch (error) {
    next(error)
  }
}

export const createTopic: Handler = async (req, res, next) => {
  try {
    const { title } = req.body as TopicPropsFromClient
    if (!title) {
      throw new RequestError(invalidSaving, 'RequestError')
    }
    const topic: Topic = await Topic.create({
      title,
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
