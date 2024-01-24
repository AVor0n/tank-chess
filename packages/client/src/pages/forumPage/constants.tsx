import styles from './forumPage.module.scss'

export const FORUM_PAGE_COLUMNS = [
  { id: 'theme', name: () => <span className={styles.thTable}>Тема</span> },
  { id: 'postsNumber', name: () => <span className={styles.thTable}>Всего постов</span> },
  { id: 'lastPost', name: () => <span className={styles.thTable}>Последний пост</span> },
]
