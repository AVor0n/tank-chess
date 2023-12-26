export interface User {
  id: number
  phone: string
  second_name: string
  avatar?: string
  login: string
  first_name: string
  email: string
}

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
