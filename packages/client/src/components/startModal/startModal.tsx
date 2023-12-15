import { useState } from 'react'
import styles from './startModal.module.scss'
import ModalOverlay from '../modalOverlay/modalOverlay'
import { RULES_LIST } from '../../utils/constants'
import { Button } from '@gravity-ui/uikit'
import GameRule from './gameRule'
import { Pagination, PaginationProps } from '@gravity-ui/uikit'

interface StartModalProps {
  closeModal: () => void
  startGame: () => void
}

export const StartModal = ({ closeModal, startGame }: StartModalProps) => {
  const [currentPage, setCurrentPage] = useState({
    page: 1,
    pageSize: 1,
  })

  const handleUpdate: PaginationProps['onUpdate'] = (page, pageSize) => {
    setCurrentPage(prevState => ({ ...prevState, page, pageSize }))
  }

  const handleStartButton = () => {
    closeModal()
    startGame()
  }

  return (
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
      <ModalOverlay onClick={closeModal} />
    </div>
  )
}
