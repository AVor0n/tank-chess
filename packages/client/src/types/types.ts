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

export interface EmojiType {
  id: number
  code: string
  description: string
  isPopular: boolean
}

export interface ReactionType {
  id: number
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
