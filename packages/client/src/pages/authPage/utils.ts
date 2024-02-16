export const redirectToOAuthPage = (clientId: string) => {
  // oAuth работает только для localhost с портами 3000, 5000 и 9000
  // Если изменить, то будет будет выдавать 400 - 'redirect_uri не совпадает с Callback URL, указанным при регистрации приложения'
  const redirectUrl = 'http://localhost:3000'

  window.location.replace(
    `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUrl}`,
  )
}
