import * as fs from 'fs'
import path from 'path'
import { type RequestHandler } from 'express'
import { type Optional, type Transaction } from 'sequelize'
import { Emoji, Reaction } from '../models'
import { type CreateEmojiProps } from '../models/emoji'

/* eslint @typescript-eslint/no-misused-promises: 0 */
/* eslint @typescript-eslint/no-unsafe-assignment: 0 */
/* eslint @typescript-eslint/no-unsafe-argument: 0 */

export interface ReactionType {
  code: string
  quantity: number
  emojiId: number
}
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

export const findReaction = async (
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
    /**исп прямой запрос,
     * так как findAll  бажит с count и
     * выборкой полей из второй таблицы с исп. include
     * */
    const queryResult: [unknown[], unknown] | undefined = await Reaction.sequelize?.query(
      `SELECT  "Reaction"."emoji_id" as "emojiId",  "Emoji"."code" as "code", COUNT("Reaction"."emoji_id") AS "quantity"
      FROM "reactions" AS "Reaction", "emoji" as "Emoji"
      WHERE "Reaction"."comment_id" = '${commentId}' AND "Reaction"."emoji_id" = "Emoji"."id"
      GROUP BY "emoji_id", "Emoji"."code"`,
    )

    let reactions: ReactionType[]
    if (queryResult) reactions = queryResult[0] as ReactionType[]
    else reactions = []
    res.status(200).json(reactions)
  } catch (error) {
    res.status(200).json([])
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
      if (reaction === null) await addReactionOnComment(commentId, emojiId, userId, tr)
      else await deleteReactionOnComment(reaction.dataValues.id, tr)
    })
    res.status(200).json({ commentId, emojiId, userId })
    return true
  } catch (error) {
    if (error instanceof Error) res.status(500).json({ result: error.message })
    return false
  }
}
