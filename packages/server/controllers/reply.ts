import { type Handler } from 'express'
import { RESPONSE_MESSAGES } from '../constants'
import { RequestError, NotFoundError } from '../errors'
import { Reply } from '../models'

const { invalidSaving } = RESPONSE_MESSAGES[400].comments
const { notFoundCommentId } = RESPONSE_MESSAGES[404].comments

interface ReplyPropsFromClient {
  commentId: number
  parentId: number
  text: string
}

/* eslint-disable @typescript-eslint/no-misused-promises*/
export const getReply: Handler = async (req, res, next) => {
  try {
    const { replyId } = req.params
    const reply = await Reply.findByPk(replyId)
    if (!reply) {
      throw new NotFoundError(notFoundCommentId, 'NotFoundError')
    }
    res.status(200).json(reply.toJSON())
  } catch (error) {
    next(error)
  }
}

export const addReply: Handler = async (req, res, next) => {
  try {
    const { commentId, parentId, text } = req.body as ReplyPropsFromClient
    if (!text) {
      throw new RequestError(invalidSaving, 'RequestError')
    }
    let reply
    if (!parentId) {
      reply = await Reply.create({
        comment_id: Number(commentId),
        text,
      })
    } else {
      reply = await Reply.create({
        comment_id: Number(commentId),
        parent: parentId,
        text,
      })
    }
    res.status(200).json({ message: 'Комментарий успешно добавлен', data: reply })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const deleteReply: Handler = async (req, res, next) => {
  try {
    const { replyId } = req.params
    const reply = await Reply.destroy({
      where: { id: replyId },
    })
    if (!reply) {
      throw new NotFoundError(notFoundCommentId, 'NotFoundError')
    }
    res.status(200).json(reply)
  } catch (error) {
    next(error)
  }
}

export const like: Handler = async (req, res, next) => {
  try {
    const { replyId } = req.params
    const replyForLike = await Reply.findByPk(replyId)
    if (!replyForLike) {
      throw new NotFoundError(notFoundCommentId, 'NotFoundError')
    }
    replyForLike.increment('like_count')
    res.status(200).json(replyForLike.toJSON())
  } catch (error) {
    next(error)
  }
}
