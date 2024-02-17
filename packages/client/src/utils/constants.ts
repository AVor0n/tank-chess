export const MAIN_MENU_LINKS = [
  { to: '/game', label: 'Начать игру' },
  { to: '/profile', label: 'Профиль' },
  { to: '/rating', label: 'Лидербоард' },
  { to: '/forum', label: 'Форум' },
]

/* URLS */
export const URL_RESOURCES = 'https://ya-praktikum.tech/api/v2/resources/'

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
export const BASE_URL = 'https://ya-praktikum.tech/api/v2'
// Заменить на облачный ресурс в будущем
export const SELF_API_URL = `http://localhost:9000/api`

/** Ключ для сохранения результатов на бэке */
export const GAME_ID = '__tank-chess-33-test'
