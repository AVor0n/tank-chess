import { type Nullable, type EmojiType } from 'types/types'
import { FORUM_BASE_URL } from '../utils/constants'
/* eslint no-console: 0 */
/* eslint @typescript-eslint/no-misused-promises: 0 */
/* eslint @typescript-eslint/no-unsafe-assignment: 0 */
/* eslint @typescript-eslint/no-unsafe-argument: 0 */

class EmojiService {
  baseURL = FORUM_BASE_URL

  importEmoji = async () => {
    try {
      const response: Response = await fetch(this.baseURL + '/reactions/import', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
      })
      console.log(response)

      const result = await response?.json()
      console.log(result)
    } catch (error) {
      if (error instanceof Error) console.log('ошибка')
    }
  }

  async getEmojiSet(limit = 100): Promise<Nullable<EmojiType[]>> {
    try {
      const response: Response = await fetch(this.baseURL + '/reactions/' + limit, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
      })

      const emojiArray: EmojiType[] = await response?.json()
      return emojiArray
    } catch (error) {
      return null
    }
  }

  async getReactionsOnComment(commentId: number) {
    try {
      const response: Response = await fetch(this.baseURL + '/reactions/comment/' + commentId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
      })

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const reactions: Record<string, any>[] = await response?.json()
      return reactions.map(reaction => ({
        code: (reaction.emoji as Record<string, string>).code,
        id: reaction.id,
        quantity: reaction.quantity,
        emojiId: reaction.emoji_id,
      }))
    } catch (error) {
      return []
    }
  }

  async addReactionsOnComment(commentId: number, emojiId: number) {
    const response: Response = await fetch(this.baseURL + '/reactions/comment/add-reaction', {
      method: 'POST',
      body: JSON.stringify({ commentId, emojiId }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'include',
      mode: 'cors',
    })

    const result: JSON = await response?.json()
    return result
  }

  async deleteReactionsOnComment(commentId: number, emojiId: number) {
    const response: Response = await fetch(this.baseURL + '/reactions/comment/delete-reaction', {
      method: 'POST',
      body: JSON.stringify({ commentId, emojiId }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'include',
      mode: 'cors',
    })

    const result: JSON = await response?.json()
    return result
  }
}
const EmojiServiceInstance = new EmojiService()
export default EmojiServiceInstance
