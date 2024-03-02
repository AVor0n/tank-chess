import { type TableColumnConfig } from '@gravity-ui/uikit'
import styles from './forumPage.module.scss'

export interface TopicRow {
  id: string
  title: string
  updatedAt: string
  commentsCount: number
}

export const FORUM_PAGE_COLUMNS: TableColumnConfig<TopicRow>[] = [
  { id: 'title', name: () => <span className={styles.thTable}>Тема</span> },
  { id: 'commentsCount', name: () => <span className={styles.thTable}>Всего постов</span>, align: 'center' },
  { id: 'updatedAt', name: () => <span className={styles.thTable}>Последнее обновление</span> },
  { id: 'userLogin', name: () => <span className={styles.thTable}>Автор топика</span> },
]
