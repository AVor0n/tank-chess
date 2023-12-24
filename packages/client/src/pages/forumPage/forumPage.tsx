import { Pagination, Table } from '@gravity-ui/uikit'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ROWS_PER_PAGE } from '@pages/leaderboad/constants'
import { usePagination } from 'hook/usePagination'
import { FORUM_PAGE_COLUMNS } from './constants'
import styles from './forumPage.module.scss'

export interface TopicDto {
  id: string
  theme: string
  postsNumber: number
  lastPost: string
}

// Моковые данные, по структуре хранения нужно будет продумать при создании бека
export const TOPICS: TopicDto[] = [
  {
    id: '1',
    theme: 'Правил игры',
    postsNumber: 1,
    lastPost: 'userLogin - 3 дня назад',
  },
  {
    id: '2',
    theme: 'Противник',
    postsNumber: 1,
    lastPost: 'userLogin - 3 дня назад',
  },
]

export const ForumPage = () => {
  const [currentPage, handleUpdate] = usePagination(ROWS_PER_PAGE)
  const [topics, setTopics] = useState<TopicDto[]>(TOPICS)
  const [filteredTopics, setFilteredTopics] = useState<TopicDto[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    setTopics(TOPICS)
  }, [])

  useEffect(() => {
    const startIndex = (currentPage.page - 1) * currentPage.pageSize
    const endIndex = (currentPage.page - 1) * currentPage.pageSize + currentPage.pageSize - 1
    setFilteredTopics(topics.slice(startIndex, endIndex + 1))
  }, [topics, currentPage.page, currentPage.pageSize])

  const handleTopicClick = (topic: TopicDto) => {
    navigate(`/forum/${topic.id}`)
  }

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Форум</h2>
        <Link className={styles.link} to="/forum/add-new-topic">
          + Добавить топик
        </Link>
      </div>
      <Table
        className={styles.table}
        data={filteredTopics}
        columns={FORUM_PAGE_COLUMNS}
        onRowClick={handleTopicClick}
      />
      <Pagination
        className={styles.paginator}
        page={currentPage.page}
        pageSize={currentPage.pageSize}
        total={topics.length}
        onUpdate={handleUpdate}
      />
    </section>
  )
}
