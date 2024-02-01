import { BASE_URL } from '@utils/constants'
import { setError } from 'reducers/error'
import store from 'store'

type data = Record<string, string>
type callback = (data: data) => void

const cbError = (error: Error) => {
  store.dispatch(setError(error.message))
}

const userService = {
  changeAvatar: (data: FormData, cb: callback) =>
    fetch(`${BASE_URL}/user/profile/avatar`, {
      method: 'PUT',
      body: data,
      headers: {
        Accept: 'application/json',
      },
      credentials: 'include',
      mode: 'cors',
    })
      .then(async data => {
        if (data.status === 200) {
          const response: data = (await data.json()) as data
          cb(response)
        } else {
          store.dispatch(setError('Произошла ошибка при смене аватара'))
        }
      })
      .catch(cbError),
  changePassword: (data: Record<string, File | string>, cb: callback) =>
    fetch(`${BASE_URL}/user/password`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      mode: 'cors',
    })
      .then(async data => {
        if (data.status === 200) {
          const response: data = (await data.json()) as data
          cb(response)
        } else {
          store.dispatch(setError('Произошла ошибка при смене пароля'))
        }
      })
      .catch(cbError),
}

export default userService
