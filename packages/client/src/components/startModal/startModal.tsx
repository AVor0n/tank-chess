import { Modal, Button, Pagination, type PaginationProps } from '@gravity-ui/uikit'
import { useCallback, useState } from 'react'
import { RULES_LIST } from './constants'
import GameRule from './gameRule'
import styles from './startModal.module.scss'

interface StartModalProps {
  startGame: () => void
}

export const StartModal = ({ startGame }: StartModalProps) => {
  const [open, setOpen] = useState(true)
  const [currentPage, setCurrentPage] = useState({
    page: 1,
    pageSize: 1,
  })

  const handleUpdate: PaginationProps['onUpdate'] = useCallback((page, pageSize) => {
    setCurrentPage(prevState => ({ ...prevState, page, pageSize }))
  }, [])

  const handleStartButton = () => {
    setOpen(false)
    startGame()
  }

  return (
    <Modal open={open} onClose={handleStartButton}>
      <div className={styles.container}>
        <GameRule currentPage={currentPage.page - 1} />
        <Pagination
          className={styles.paginator}
          page={currentPage.page}
          pageSize={currentPage.pageSize}
          total={RULES_LIST.length}
          onUpdate={handleUpdate}
        />
        <Button size="xl" className={styles.button} onClick={handleStartButton}>
          Начать
        </Button>
      </div>
    </Modal>
  )
}
