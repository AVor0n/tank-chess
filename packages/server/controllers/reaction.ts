import * as fs from 'fs'
import path from 'path'
import { type RequestHandler } from 'express'
import sequelize, { type Optional, type Transaction } from 'sequelize'
import { Emoji, Reaction } from '../models'
import { type CreateEmojiProps } from '../models/emoji'

/* eslint @typescript-eslint/no-misused-promises: 0 */
/* eslint @typescript-eslint/no-unsafe-assignment: 0 */
/* eslint @typescript-eslint/no-unsafe-argument: 0 */

const addEmoji = async (emojiData: Optional<CreateEmojiProps, 'id'>[]) => {
  try {
    await Emoji.bulkCreate(emojiData)
  } catch (error) {
    if (error instanceof Error) console.log(error.message)
  }
}

export const importEmojiFromJSON = async () => {
  try {
    let data: string = fs.readFileSync(path.parse(__dirname).dir + '/assets/emoji.json').toString()
    let emojiInfo: Record<string, string>[] = JSON.parse(data)
    const emojiData: Record<string, string>[] = []
    emojiInfo.forEach((item: Record<string, string>) => {
      emojiData.push({
        code: item.char,
        description: item.name,
      })
    })
    await addEmoji(emojiData as unknown as Optional<CreateEmojiProps, 'id'>[])
    console.log('Эмодзи успешно импортированы')
    return true
  } catch (error) {
    if (error instanceof Error) console.log(error.message)
    return false
  }
}

export const clearEmoji: RequestHandler = async (_, res) => {
  try {
    await Emoji.destroy({
      truncate: true,
    })
    res.status(200).json({ result: 'ok' })
    console.log('Таблица с эмодзи очищена')
  } catch (error) {
    console.log(error)
  }
}

const findReaction = async (
  commentId: number,
  emojiId: number,
  userId: number,
  transaction: Transaction | null = null,
) => {
  try {
    const reaction = await Reaction.findOne({
      lock: transaction?.LOCK.UPDATE,
      where: {
        comment_id: commentId,
        emoji_id: emojiId,
        user_id: userId,
        /**добавить user_id */
      },
      transaction,
    })
    return reaction
  } catch (error) {
    return null
  }
}

export const getAllEmoji: RequestHandler = async (req, res) => {
  try {
    const { limit } = req.params
    const emojiBar = await Emoji.findAll({
      limit: Number(limit),
    })
    if (!emojiBar.length) throw new Error('Эмодзи не загружены')
    res.status(200).json(emojiBar)
    return emojiBar
  } catch (error) {
    if (error instanceof Error) res.status(404).json({ result: error.message })
    return null
  }
}

export const getReactionsOnComment: RequestHandler = async (req, res) => {
  try {
    const { commentId } = req.params

    const reactions = await Reaction.findAll({
      attributes: ['id', 'emoji_id', 'comment_id', [sequelize.fn('COUNT', sequelize.col('id')), 'quantity']],
      include: [
        {
          model: Emoji,
          attributes: ['code'],
        },
      ],
      where: { comment_id: commentId },
      group: ['comment_id'],
    })

    if (!reactions.length) return []

    res.status(200).json(reactions)
    return reactions
  } catch (error) {
    return []
  }
}

export const addReactionOnComment = async (
  commentId: number,
  emojiId: number,
  userId: number,
  tr: Transaction | null = null,
): Promise<boolean> => {
  try {
    await Reaction.create(
      {
        user_id: Number(userId),
        comment_id: Number(commentId),
        emoji_id: Number(emojiId),
      },
      {
        transaction: tr,
        conflictFields: ['comment_id', 'emoji_id', 'user_id'],
      },
    )
    return true
  } catch (error) {
    return false
  }
}

export const deleteReactionOnComment = async (reactionId: number, tr: Transaction | null = null): Promise<boolean> => {
  try {
    await Reaction.destroy({
      where: { id: reactionId },
      transaction: tr,
    })
    return true
  } catch (error) {
    return false
  }
}

export const doReaction: RequestHandler = async (req, res) => {
  try {
    const { commentId, emojiId, userId } = req.body
    await Reaction.sequelize?.transaction({}, async tr => {
      const reaction: Reaction | null = await findReaction(commentId, emojiId, userId, tr)
      if (reaction) deleteReactionOnComment(reaction.dataValues.id, tr)
      else addReactionOnComment(commentId, emojiId, userId, tr)
    })
    res.status(200).json({ commentId, emojiId })
    return true
  } catch (error) {
    if (error instanceof Error) res.status(500).json({ result: error.message })
    return false
  }
}
