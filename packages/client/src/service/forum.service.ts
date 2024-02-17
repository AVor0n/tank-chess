import { type CommentDto } from 'reducers/forum/commentSlice'
import { type TopicDto } from 'reducers/forum/topicSlice'
import { SELF_API_URL } from '../utils/constants'

export const checkResponse = <T>(res: Response): Promise<T> =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  res.ok ? res.json() : res.json().then(() => Promise.reject(res.status))

export const apiRequest = <T>(url: string, options: RequestInit): Promise<T> =>
  fetch(url, options).then(res => checkResponse<T>(res))

export const getTopicsRequestApi = () =>
  apiRequest<TopicDto[]>(`${SELF_API_URL}/topics`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charger=utf-8',
    },
    credentials: 'include',
    mode: 'cors',
  })

export const getTopicByIdRequestApi = (topicId: string) =>
  apiRequest<TopicDto>(`${SELF_API_URL}/topics/${topicId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charger=utf-8',
    },
    credentials: 'include',
    mode: 'cors',
  })

export const createNewTopicRequestApi = (title: string, text: string) =>
  apiRequest<TopicDto>(`${SELF_API_URL}/topics`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Accept: 'application/json',
    },
    credentials: 'include',
    mode: 'cors',
    body: JSON.stringify({
      title,
      text,
    }),
  })

export const createNewCommentRequestApi = (text: string, topicId: string) =>
  apiRequest<CommentDto>(`${SELF_API_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charger=utf-8',
    },
    credentials: 'include',
    mode: 'cors',
    body: JSON.stringify({
      text,
      topicId,
    }),
  })

export const deleteCommentRequestApi = (commentId: string) =>
  apiRequest<CommentDto>(`${SELF_API_URL}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charger=utf-8',
    },
    credentials: 'include',
    mode: 'cors',
  })
