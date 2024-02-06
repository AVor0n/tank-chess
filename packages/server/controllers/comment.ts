import { type RequestHandler } from 'express'
import { RESPONSE_MESSAGES } from '../constants'
import { RequestError, NotFoundError } from '../errors'
import { Comment } from '../models'

const { invalidSaving } = RESPONSE_MESSAGES[400].topics
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
    res.status(201).json({ message: 'Комментарий успешно добавлен', data: newComment })
  } catch (error) {
    next(error)
  }
}

export const getComment: RequestHandler = async (req, res, next) => {
  try {
    const { commentId } = req.params
    const comment = await Comment.findOne({
      where: { id: commentId },
    })
    if (!comment) {
      throw new NotFoundError('Такого id не существует!', 'NotFoundError')
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
      throw new NotFoundError('Такого id не существует!', 'NotFoundError')
    }
    res.status(200).json(comment)
  } catch (error) {
    next(error)
  }
}

export const like: RequestHandler = async (req, res, next) => {
  try {
    const { commentId } = req.params
    const commentForLike = await Comment.findByPk(commentId)
    if (!commentForLike) {
      throw new NotFoundError(notFoundCommentId, 'NotFoundError')
    }
    commentForLike.increment('like_count')
    res.status(200).json(commentForLike.toJSON())
  } catch (error) {
    next(error)
  }
}
