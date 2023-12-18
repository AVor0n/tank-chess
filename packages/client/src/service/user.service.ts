import { URL_RESOURCES } from '@utils/constants'

type data = Record<string, string>
type callback = (data: data) => void

/* eslint no-console: 0 */
const cbError = (error: Error) => console.log('error', error)

const userService = {
  changeAvatar: (data: FormData, cb: callback) =>
    fetch(`${URL_RESOURCES}user/profile/avatar`, {
      method: 'PUT',
      body: data,
      headers: {
        mode: 'no-cors',
      },
    })
      .then(async data => {
        if (data.status === 200) {
          const response: data = (await data.json()) as data
          cb(response)
        } else {
          console.log('error upload image')
        }
      })
      .catch(cbError),
  changePassword: (data: Record<string, File | string>, cb: callback) =>
    fetch(`${URL_RESOURCES}user/password`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async data => {
        if (data.status === 200) {
          const response: data = (await data.json()) as data
          cb(response)
        } else {
          console.log('error change password')
        }
      })
      .catch(cbError),
}

export default userService
