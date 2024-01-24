import { type TableColumnConfig } from '@gravity-ui/uikit'
import { type ReactNode } from 'react'
import styles from './leaderboard.module.scss'

export const TABLE_HEADER: TableColumnConfig<{
  id: string
  name: string | (() => ReactNode)
  align: string
}>[] = [
  { id: 'rating', name: () => <span className={styles.thTable}>Рейтинг</span>, align: 'center' },
  { id: 'login', name: () => <span className={styles.thTable}>Логин</span>, align: 'center' },
  { id: 'email', name: () => <span className={styles.thTable}>E-mail</span>, align: 'center' },
  {
    id: 'totalGames',
    name: () => <span className={styles.thTable}>Всего сыграно</span>,
    align: 'center',
  },
  {
    id: 'winsNumber',
    name: () => <span className={styles.thTable}>Количество побед</span>,
    align: 'center',
  },
]

export const ROWS_PER_PAGE = 3
