import { URL } from '../../utils/constants'

export const redirectToOAuthPage = (clientId: string) => {
  window.location.replace(
    `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${URL}`,
  )
}
