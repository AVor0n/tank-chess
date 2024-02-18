import { Modal, Button, Pagination } from '@gravity-ui/uikit'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { usePagination } from 'hook/usePagination'
import { initGame } from 'reducers/game'
import { RULES_LIST } from './constants'
import GameRule from './gameRule'
import styles from './startModal.module.scss'

export const StartModal = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(true)
  const [currentPage, handleUpdate] = usePagination(1)

  const handleStartButton = () => {
    setOpen(false)
    dispatch(initGame())
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
        <Button size="xl" className={styles.button} view="action" pin="brick-brick" onClick={handleStartButton}>
          Начать
        </Button>
      </div>
    </Modal>
  )
}
