import { type RequestHandler } from 'express'
import { RESPONSE_MESSAGES } from '../constants'
import { RequestError, NotFoundError } from '../errors'
import { Comment, Topic } from '../models'

const { invalidSaving } = RESPONSE_MESSAGES[400].comments
const { notFoundCommentId } = RESPONSE_MESSAGES[404].comments

interface CommentPropsFromClient {
  topicId: number
  text: string
}

/* eslint-disable @typescript-eslint/no-misused-promises*/
export const createComment: RequestHandler = async (req, res, next) => {
  try {
    const { text, topicId } = req.body as CommentPropsFromClient

    if (!text) {
      throw new RequestError(invalidSaving, 'RequestError')
    }

    const newComment = await Comment.create({
      topic_id: Number(topicId),
      text,
    })
    if (newComment) {
      const topic = await Topic.findByPk(Number(topicId))
      topic?.changed('updatedAt', true)
      await topic?.update({
        updatedAt: new Date(),
      })
    }
    res.status(201).json(newComment)
  } catch (error) {
    next(error)
  }
}

export const getComment: RequestHandler = async (req, res, next) => {
  try {
    const { commentId } = req.params
    const comment = await Comment.findByPk(commentId)
    if (!comment) {
      throw new NotFoundError(notFoundCommentId, 'NotFoundError')
    }

    res.status(200).json(comment.toJSON())
  } catch (error) {
    next(error)
  }
}

export const deleteComment: RequestHandler = async (req, res, next) => {
  try {
    const { commentId } = req.params
    const comment = await Comment.destroy({
      where: { id: commentId },
    })
    if (!comment) {
      throw new NotFoundError(notFoundCommentId, 'NotFoundError')
    }
    res.status(200).json(comment)
  } catch (error) {
    next(error)
  }
}

export const like: RequestHandler = async (req, res, next) => {
  try {
    const { commentId } = req.params
    const comment = await Comment.findByPk(commentId)
    if (!comment) {
      throw new NotFoundError(notFoundCommentId, 'NotFoundError')
    }
    comment.increment('like_count')
    res.status(200).json(comment.toJSON())
  } catch (error) {
    next(error)
  }
}
