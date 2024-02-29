import { type Nullable, type EmojiType, type ReactionType } from 'types/types'
import { BASE_URL } from '../utils/constants'
/* eslint no-console: 0 */
/* eslint @typescript-eslint/no-misused-promises: 0 */
/* eslint @typescript-eslint/no-unsafe-assignment: 0 */
/* eslint @typescript-eslint/no-unsafe-argument: 0 */

interface doReactionAnswerType {
  emojiId: number
  userId: number
  commentId: number
}

class EmojiService {
  baseURL = BASE_URL

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

  async getReactionsOnComment(commentId: number): Promise<ReactionType[]> {
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
      return (await response?.json()) as ReactionType[]
    } catch (error) {
      return []
    }
  }

  async doReactionOnComment(
    commentId: number,
    emojiId: number,
    userId: number,
  ): Promise<doReactionAnswerType | { reason: string }> {
    const response: Response = await fetch(this.baseURL + '/reactions/comment/reaction', {
      method: 'POST',
      body: JSON.stringify({ commentId, emojiId, userId }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'include',
      mode: 'cors',
    })

    const result: doReactionAnswerType | { reason: string } = await response?.json()
    return result
  }
}
const EmojiServiceInstance = new EmojiService()
export default EmojiServiceInstance
