export const MAIN_MENU_LINKS = [
  { to: '/game', label: 'Начать игру' },
  { to: '/profile', label: 'Профиль' },
  { to: '/rating', label: 'Лидербоард' },
  { to: '/forum', label: 'Форум' },
]

/* VALIDATE */
export const VALID_EMAIL = 'validEmail'
export const VALID_PASSWORD = 'validPassword'
export const VALID_LOGIN = 'validLogin'
export const VALID_PHONE = 'validPhone'
export const VALID_NAME = 'validName'
export const REQUIRED = 'required'
export const MIN_LENGTH = 'minLength'
export const MAX_LENGTH = 'maxLength'

export const errors = {
  default: 'Проверьте правильность поля',
}

/* URLS */
export const BASE_URL = 'http://localhost:5000/api'
export const URL_RESOURCES = 'http://localhost:5000/api/proxy/resources/'

/** Ключ для сохранения результатов на бэке */
export const GAME_ID = '__tank-chess-33-test'
