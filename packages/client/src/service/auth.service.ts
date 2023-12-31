import { setUserContext, pending, result } from 'reducers/user'
import store from 'store'
import { type SignUpDataType, type SignInDataType, type User, type ErrorResponse, type Nullable } from '../types/types'
import { BASE_URL } from '../utils/constants'

/* eslint-disable no-console*/
class AuthService {
  baseURL: string = BASE_URL

  async signUp(data: SignUpDataType, afterSignUp: (login: string, password: string) => void): Promise<void> {
    try {
      const response: Response = await fetch(this.baseURL + '/auth/signup', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
      })
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const result: User | ErrorResponse = await response?.json()
      if ((result as User).id > 0) afterSignUp(data.login, data.password)
      else {
        throw new Error((result as ErrorResponse).reason)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async signIn(data: SignInDataType, afterSignIn: () => void): Promise<void> {
    try {
      const response = await fetch(this.baseURL + '/auth/signin', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
      })
      let result: string | ErrorResponse
      if (response?.status !== 200) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        result = await response.json()
      } else result = await response.text()

      if (result === 'OK') {
        afterSignIn()
      } else {
        throw new Error((result as ErrorResponse).reason)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async logout(callback: () => void) {
    console.log(123)
    store.dispatch(pending())
    try {
      const response = await fetch(this.baseURL + '/auth/logout', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
      })
      if (response.status !== 200) {
        throw new Error('Ошибка!')
      } else {
        callback()
        store.dispatch(setUserContext(null))
      }
    } finally {
      store.dispatch(result())
    }
  }

  async getUser(): Promise<Nullable<User>> {
    let user: User | null
    store.dispatch(pending())
    try {
      const response: Response = await fetch(this.baseURL + '/auth/user', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
      })
      if (response.status !== 200) {
        user = null
      }
      user = (await response.json()) as User
    } catch (error) {
      user = null
    } finally {
      store.dispatch(result())
    }
    store.dispatch(setUserContext(user))
    return user
  }
}

const AuthServiceInstance = new AuthService()
export default AuthServiceInstance
