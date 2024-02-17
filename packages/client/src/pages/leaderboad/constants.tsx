import { type TableColumnConfig } from '@gravity-ui/uikit'
import { type GameResult } from 'types/types'
import styles from './leaderboard.module.scss'

export type LeaderboardRow = Partial<Record<keyof GameResult, string | number>>

export const TABLE_HEADER: TableColumnConfig<LeaderboardRow>[] = [
  { id: 'score', name: () => <span className={styles.thTable}>Рейтинг</span>, align: 'center' },
  { id: 'userName', name: () => <span className={styles.thTable}>Логин</span>, align: 'center' },
  { id: 'endDate', name: () => <span className={styles.thTable}>Дата</span>, align: 'center' },
]

export const ROWS_PER_PAGE = 10
