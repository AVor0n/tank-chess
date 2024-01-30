import { type ErrorResponse } from 'react-router-dom'
import { setError } from 'reducers/error'
import store from 'store'
import { type Nullable } from '../types/types'
import { BASE_URL } from '../utils/constants'

interface ServiceIdResponse {
  service_id: string
}

class OAuthService {
  baseURL: string = BASE_URL

  async getClientID() {
    try {
      const response: Response = await fetch(this.baseURL + '/oauth/yandex/service-id', {
        method: 'GET',
      })
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const result: ServiceIdResponse | ErrorResponse = await response?.json()
      return (result as ServiceIdResponse).service_id
    } catch (error) {
      if (error instanceof Error) store.dispatch(setError(error.message))
    }
  }

  async redirectYandexUrl(): Promise<string> {
    try {
      const clientId = await this.getClientID()
      const redirectUrl = window.location.origin
      return `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUrl}`
    } catch (error) {
      if (error instanceof Error) store.dispatch(setError(error.message))
      return location.pathname
    }
  }

  async executeOAuth(code: string): Promise<Nullable<string>> {
    if (!code) {
      return null
    }
    const data = { code: code }
    try {
      const response: Response = await fetch(this.baseURL + '/oauth/yandex', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      })
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const result: string | ErrorResponse = await response?.json()
      if (typeof result === 'string') return result
    } catch (error) {
      if (error instanceof Error) return null
    }
    return null
  }
}

const oAuthServiceInstance = new OAuthService()
export default oAuthServiceInstance
