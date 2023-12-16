import { URL_RESOURCES } from '../../utils/constants'

type callback = (data: Record<string, any>) => void

const cbError = (error: Error) => console.log('error', error)

export default {
  changeAvatar: (data: FormData, cb: callback) => {
    return fetch(`${URL_RESOURCES}user/profile/avatar`, {
      method: 'PUT',
      body: data,
      headers: {
        mode: 'no-cors',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          cb(data.response)
        } else {
          console.log('error upload image')
        }
      })
      .catch(cbError)
  },
  changePassword: (data: Record<string, any>, cb: callback) => {
    return fetch(`${URL_RESOURCES}user/password`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          cb(data.response)
        } else {
          console.log('error change password')
        }
      })
      .catch(cbError)
  },
}
