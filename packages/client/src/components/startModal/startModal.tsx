import { Modal, Button, Pagination } from '@gravity-ui/uikit'
import { useState } from 'react'
import { usePagination } from 'hook/usePagination'
import { RULES_LIST } from './constants'
import GameRule from './gameRule'
import styles from './startModal.module.scss'

interface StartModalProps {
  startGame: () => void
}

export const StartModal = ({ startGame }: StartModalProps) => {
  const [open, setOpen] = useState(true)
  const [currentPage, handleUpdate] = usePagination(1)

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
