import { type PostDto } from 'types/types'
import { FORUM_BASE_URL } from '../utils/constants'
/* eslint no-console: 0 */
class ForumService {
  baseURL = FORUM_BASE_URL

  addTopic = async (title: string) => {
    try {
      const response: Response = await fetch(this.baseURL + '/topics/', {
        method: 'POST',
        body: JSON.stringify({ title }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
      })
      console.log(response)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const result = await response?.json()
      console.log(result)
    } catch (error: unknown) {
      console.log('ошибка')
    }
  }

  addComment = async (text: string) => {
    try {
      const response: Response = await fetch(this.baseURL + '/comments/', {
        method: 'POST',
        body: JSON.stringify({ topicId: 1, text: text }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
      })
      console.log(response)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const result = await response?.json()
      console.log(result)
    } catch (error: unknown) {
      console.log('ошибка')
    }
  }

  getComments = async (topicId: number) => {
    try {
      const response: Response = await fetch(this.baseURL + '/topics/' + topicId + '/comments', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
      })
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const comments: PostDto[] = await response?.json()
      return comments
    } catch (error: unknown) {
      console.log('ошибка')
    }
    return []
  }
}

const ForumServiceInstance = new ForumService()
export default ForumServiceInstance
