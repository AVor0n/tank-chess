import { Loader, Pagination, Table } from '@gravity-ui/uikit'
import { useEffect, useState } from 'react'
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
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])

  useEffect(() => {
    const startIndex = (currentPage.page - 1) * currentPage.pageSize
    const endIndex = (currentPage.page - 1) * currentPage.pageSize + currentPage.pageSize - 1
    setFilteredUsers(users.slice(startIndex, endIndex + 1))
  }, [users, currentPage.page, currentPage.pageSize])

  if (users.length === 0) {
    return <Loader />
  }

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Таблица лидеров</h2>
      <Table data={filteredUsers} columns={TABLE_HEADER} className={styles.table} />
      <Pagination
        className={styles.paginator}
        page={currentPage.page}
        pageSize={currentPage.pageSize}
        total={users.length}
        onUpdate={handleUpdate}
      />
    </section>
  )
}
