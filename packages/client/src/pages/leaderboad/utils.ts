import { datetimeFormatter } from '@utils/format'
import { type GameResult } from 'types/types'

export const gameResultToLeaderboardRow = (data: GameResult[]) =>
  data.map(record => ({
    score: record.score,
    userName: record.userName,
    endDate: datetimeFormatter(new Date(record.endDate)),
  }))
