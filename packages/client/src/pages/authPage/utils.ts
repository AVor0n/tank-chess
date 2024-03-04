import { URL } from '../../utils/constants'

export const redirectToOAuthPage = (clientId: string) => {
  /* redirect_uri -  uri, указанный при регистрации на oAuth яндекса.
   ** Если изменить, то будет будет выдавать 400 - 'redirect_uri не совпадает с Callback URL, указанным при регистрации приложения'*/
  const redirectUrl = URL

  window.location.replace(
    `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUrl}`,
  )
}
