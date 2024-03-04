import dotenv from 'dotenv'

dotenv.config()

export const PORT = Number(process.env.SERVER_PORT) || 5000

export const LOCAL_ORIGINS = [
  `http://127.0.0.1:5000`,
  `http://localhost:5000`,
  `http://localhost`,
  `http://127.0.0.1`,
  'http://tank-chess.ya-praktikum.tech',
  'https://tank-chess.ya-praktikum.tech',
  'http://130.193.40.168',
  'https://130.193.40.168',
]

export const RESPONSE_MESSAGES = {
  400: {
    topics: {
      invalidSaving: 'Переданы невалидные данные при сохранении топика',
    },

    comments: {
      invalidSaving: 'Переданы невалидные данные при сохранении комментария',
    },
  },

  404: {
    topics: {
      notFoundTopicId: 'Топик с такими данными не найден',
    },

    comments: {
      notFoundCommentId: 'Комментарий с такими данными не найден',
    },
  },
}
