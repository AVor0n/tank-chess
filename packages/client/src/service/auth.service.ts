import { type signUpDataType, type signInDataType, type User, type ErrorResponse } from '../types/types'
import { BASE_URL } from '../utils/constants'

/* eslint-disable no-console*/
class AuthService {
  baseURL: string = BASE_URL

  public signUp(data: signUpDataType, afterSignUp: (login: string, password: string) => void): void {
    fetch(this.baseURL + '/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Accept: 'application/json',
      },
      credentials: 'include',
      mode: 'cors',
    })
      .then(response => response.json())
      .then(result => {
        if ((result as User).id > 0) afterSignUp(data.login, data.password)
        else {
          throw new Error((result as ErrorResponse).reason)
        }
      })
      .catch(error => console.log(error))
  }

  public signIn(data: signInDataType, afterSignIn: () => void): void {
    fetch(this.baseURL + '/auth/signin', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Accept: 'application/json',
      },
      credentials: 'include',
      mode: 'cors',
    })
      .then(response => {
        if (response.status !== 200) {
          return response.json()
        }
        return response.text()
      })
      .then(result => {
        if ((result as string) === 'OK') {
          afterSignIn()
        } else {
          throw new Error((result as ErrorResponse).reason)
        }
      })
      .catch(error => console.log(error))
  }

  async logout() {
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
    }

    /*
      return await fetch(this.baseURL + '/auth/logout', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
      })
        .then(async response => {
          if (response.status !== 200) {
            throw new Error('Ошибка!')
          }
        })
        .catch(error => console.log(error))*/
  }

  async getUser(): Promise<User | void> {
    const response: Response = await fetch(this.baseURL + '/auth/user', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      credentials: 'include',
      mode: 'cors',
    })
    if (response.status !== 200) {
      throw new Error('Ошибка!')
    }
    const user: User = (await response.json()) as User
    return user
  }
}

const authServ = new AuthService()
export default authServ
