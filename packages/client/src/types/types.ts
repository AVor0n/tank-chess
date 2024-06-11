import { type TANK_TYPE } from '@lib/chess'

export interface User {
  id: number
  phone: string
  second_name: string
  avatar?: string
  login: string
  first_name: string
  email: string
}

export type UserProfile = Omit<User, 'id'>

export interface SignUpDataType {
  first_name: string
  second_name: string
  login: string
  email: string
  phone: string
  password: string
}

export interface SignInDataType {
  login: string
  password: string
}

export interface ErrorResponse {
  reason: string
}

/**для ублажения линтера */
export interface LocationState {
  location: Location
}

export interface FormProps {
  state: Record<string, string>
  error: Record<string, string>
  isValid: boolean
  touched: boolean
}

export type Nullable<T> = T | null

export interface AppState {
  user: {
    userInfo: Nullable<User>
    loaded: boolean
  }
}

export interface GameResult {
  score: number
  lostOwnTanks: TANK_TYPE[]
  destroyedEnemyTanks: TANK_TYPE[]
  moves: number
  endDate: string
  userName: string
}

export interface EmojiType {
  id: number
  code: string
  description: string
  isPopular: boolean
}

export interface ReactionType {
  code: string
  quantity: number
  emojiId: number
}

export interface PostDto {
  id: number
  topicId: string
  user?: User
  title: string
  text: string
  likes: number
  time: string
  reactions: Nullable<ReactionType[]>
}

export interface ChangePasswordPayload {
  oldPassword: string
  newPassword: string
}

export interface ApiError {
  data: {
    reason?: string
    message?: string
  }
}

export const isApiError = (error: unknown): error is ApiError => {
  const apiError = error as Partial<ApiError>
  return !!(apiError?.data?.reason ?? apiError?.data?.message)
}

export interface Player {
  id?: number
  name: string
}
