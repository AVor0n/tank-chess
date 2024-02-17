import { Loader, Pagination, Table } from '@gravity-ui/uikit'
import LeftMenuPage from '@components/leftMenuPage'
import { useApiErrorToast } from 'hook/useApiErrorToast'
import { usePagination } from 'hook/usePagination'
import { api } from 'reducers/api'
import { ROWS_PER_PAGE, TABLE_HEADER } from './constants'
import { gameResultToLeaderboardRow } from './utils'
import styles from './leaderboard.module.scss'

export const Leaderboard = () => {
  const [currentPage, setCurrentPage] = usePagination(ROWS_PER_PAGE)
  const { data, error } = api.useGetLeaderboardQuery({
    page: currentPage.page - 1,
    pageSize: currentPage.pageSize,
  })
  useApiErrorToast(error)

  return (
    <LeftMenuPage>
      <div className={styles.leaderboard}>
        <h1 className={styles.title}>Таблица лидеров</h1>
        {!data ? (
          <Loader />
        ) : (
          <>
            <Table data={gameResultToLeaderboardRow(data)} columns={TABLE_HEADER} className={styles.table} />
            <Pagination
              className={styles.paginator}
              page={currentPage.page}
              pageSize={currentPage.pageSize}
              total={data.length}
              onUpdate={page => setCurrentPage(page, currentPage.pageSize)}
            />
          </>
        )}
      </div>
    </LeftMenuPage>
  )
}
