import { Loader, Pagination, Table } from '@gravity-ui/uikit'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LeftMenuPage from '@components/leftMenuPage'
import { ROWS_PER_PAGE } from '@pages/leaderboad/constants'
import { datetimeFormatter } from '@utils/format'
import { usePagination } from 'hook/usePagination'
import { selectTopicsLoading, selectTopics, type TopicDto } from 'reducers/forum/topicSlice'
import { getTopicById } from 'reducers/forum/topicThunks/getTopicById'
import { loadAllForumTopics } from 'reducers/forum/topicThunks/loadAllTopics'
import { useAppDispatch, useAppSelector } from 'reducers/hooks'
import { FORUM_PAGE_COLUMNS, type TopicRow } from './constants'
import styles from './forumPage.module.scss'

export const ForumPage = () => {
  const loadingTopics = useAppSelector(selectTopicsLoading)
  const topics = useAppSelector(selectTopics)
  const [currentPage, handleUpdate] = usePagination(ROWS_PER_PAGE)
  const [filteredTopics, setFilteredTopics] = useState<TopicDto[]>([])
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadAllForumTopics())
  }, [dispatch])

  useEffect(() => {
    const startIndex = (currentPage.page - 1) * currentPage.pageSize
    const endIndex = (currentPage.page - 1) * currentPage.pageSize + currentPage.pageSize - 1
    setFilteredTopics(topics.slice(startIndex, endIndex + 1))
  }, [topics, currentPage.page, currentPage.pageSize, dispatch])

  const handleTopicClick = (topic: TopicRow) => {
    dispatch(getTopicById(topic.id))
    navigate(`/forum/${topic.id}`)
  }

  if (loadingTopics) return <Loader />

  return (
    <LeftMenuPage>
      <div className={styles.forum}>
        <div className={styles.header}>
          <h1 className={styles.title}>Форум</h1>
          <Link className={styles.link} to="/forum/add-new-topic">
            + Добавить топик
          </Link>
        </div>
        <Table
          className={styles.table}
          data={filteredTopics.map(topic => ({
            id: topic.id,
            title: topic.title,
            updatedAt: datetimeFormatter(topic.updatedAt),
            commentsCount: topic.comments?.length ?? 0,
          }))}
          columns={FORUM_PAGE_COLUMNS}
          onRowClick={handleTopicClick}
          edgePadding={false}
        />
        <Pagination
          className={styles.paginator}
          page={currentPage.page}
          pageSize={currentPage.pageSize}
          total={topics.length}
          onUpdate={handleUpdate}
        />
      </div>
    </LeftMenuPage>
  )
}
