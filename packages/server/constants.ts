import dotenv from 'dotenv'

dotenv.config()

export const PORT = Number(process.env.SERVER_PORT) || 9000

export const LOCAL_ORIGINS = [
  `http://127.0.0.1:3000`,
  `http://localhost:3000`,
  '*', // Заменить на тот, который получим с облака
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
