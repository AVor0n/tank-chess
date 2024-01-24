import { type AlignTable } from '../../types/types'
import styles from './leaderboard.module.scss'

export const TABLE_HEADER = [
  { id: 'rating', name: () => <span className={styles.thTable}>Рейтинг</span>, align: 'center' as AlignTable },
  { id: 'login', name: () => <span className={styles.thTable}>Логин</span>, align: 'center' as AlignTable },
  { id: 'email', name: () => <span className={styles.thTable}>E-mail</span>, align: 'center' as AlignTable },
  {
    id: 'totalGames',
    name: () => <span className={styles.thTable}>Всего сыграно</span>,
    align: 'center' as AlignTable,
  },
  {
    id: 'winsNumber',
    name: () => <span className={styles.thTable}>Количество побед</span>,
    align: 'center' as AlignTable,
  },
]

export const ROWS_PER_PAGE = 3
