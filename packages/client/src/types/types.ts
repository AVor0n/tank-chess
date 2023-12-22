export interface User {
  id: number
  phone: string
  second_name: string
  avatar?: string
  login: string
  first_name: string
  email: string
}

export interface signUpDataType {
  first_name: string
  second_name: string
  login: string
  email: string
  phone: string
  password: string
}

export interface signInDataType {
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
