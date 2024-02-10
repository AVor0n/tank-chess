import * as fs from 'fs'
import path from 'path'
import { type RequestHandler } from 'express'
import { type Optional } from 'sequelize'
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

export const importEmojiFromJSON: RequestHandler = async (_, res) => {
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
    res.status(200).json(emojiData)
    console.log('Эмодзи успешно импортированы')
  } catch (error) {
    if (error instanceof Error) res.status(200).json({ result: error.message })
  }
}

export const clearEmoji: RequestHandler = async (_, res) => {
  try {
    await Reaction.destroy({
      truncate: true,
    })
    res.status(200).json({ result: 'ok' })
    console.log('Таблица с эмодзи очищена')
  } catch (error) {
    console.log(error)
  }
}

const findReaction = async (commentId: number, emojiId: number) => {
  try {
    const reaction = await Reaction.findOne({
      where: {
        comment_id: commentId,
        emoji_id: emojiId,
      },
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
      include: [
        {
          model: Emoji,
          attributes: ['code'],
        },
      ],
      where: { comment_id: commentId },
    })

    if (!reactions.length) return []

    res.status(200).json(reactions)
    return reactions
  } catch (error) {
    return []
  }
}

export const addReactionOnComment: RequestHandler = async (req, res) => {
  try {
    const { commentId, emojiId } = req.body
    const reaction: Reaction | null = await findReaction(commentId, emojiId)
    if (reaction) {
      await reaction.increment('quantity')
    } else {
      await Reaction.create({
        quantity: 1,
        comment_id: Number(commentId),
        emoji_id: Number(emojiId),
      })
    }
    res.status(200).json({ result: 'ok' })
    return true
  } catch (error) {
    res.status(500).json({ result: 'error' })
    return false
  }
}

export const deleteReactionOnComment: RequestHandler = async (req, res) => {
  try {
    const { commentId, emojiId } = req.body
    const reaction: Reaction | null = await findReaction(commentId, emojiId)
    if (reaction) {
      if (reaction.quantity >= 1) {
        reaction.decrement('quantity')
      } else {
        await Emoji.destroy({
          where: { id: reaction.id },
        })
      }
    }
    res.status(200).json({ result: 'ok' })
    return true
  } catch (error) {
    res.status(500).json({ result: 'error' })
    return false
  }
}
