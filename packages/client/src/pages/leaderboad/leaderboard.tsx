import { Loader, Pagination, Table } from '@gravity-ui/uikit'
import { useEffect, useState } from 'react'
import LeftMenuPage from '@components/leftMenuPage'
import { usePagination } from 'hook/usePagination'
import { ROWS_PER_PAGE, TABLE_HEADER } from './constants'
import styles from './leaderboard.module.scss'

export interface User {
  id: string
  rating: number
  login: string
  email: string
  totalGames: number
  winsNumber: number
}

export const Leaderboard = () => {
  const [users] = useState<User[]>(() => [
    {
      id: '1',
      login: 'userLogin',
      email: 'string@ya.ru',
      totalGames: 50,
      rating: 1,
      winsNumber: 20,
    },
    {
      id: '423',
      login: 'userLogin',
      email: 'string@ya.ru',
      totalGames: 50,
      rating: 2,
      winsNumber: 19,
    },
    {
      id: '423',
      login: 'userLogin',
      email: 'string@ya.ru',
      totalGames: 50,
      rating: 3,
      winsNumber: 19,
    },
    {
      id: '423',
      login: 'userLogin',
      email: 'string@ya.ru',
      totalGames: 50,
      rating: 4,
      winsNumber: 19,
    },
    {
      id: '423',
      login: 'userLogin',
      email: 'string@ya.ru',
      totalGames: 50,
      rating: 5,
      winsNumber: 19,
    },
  ])
  const [currentPage, handleUpdate] = usePagination(ROWS_PER_PAGE)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [filteredUsers, setFilteredUsers] = useState<any[]>([])

  useEffect(() => {
    const startIndex = (currentPage.page - 1) * currentPage.pageSize
    const endIndex = (currentPage.page - 1) * currentPage.pageSize + currentPage.pageSize - 1
    setFilteredUsers(users.slice(startIndex, endIndex + 1))
  }, [users, currentPage.page, currentPage.pageSize])

  if (users.length === 0) {
    return <Loader />
  }

  return (
    <LeftMenuPage>
      <div className={styles.leaderboard}>
        <h1 className={styles.title}>Таблица лидеров</h1>
        <Table data={filteredUsers} columns={TABLE_HEADER} className={styles.table} edgePadding={false} />
        <Pagination
          className={styles.paginator}
          page={currentPage.page}
          pageSize={currentPage.pageSize}
          total={users.length}
          onUpdate={handleUpdate}
        />
      </div>
    </LeftMenuPage>
  )
}
