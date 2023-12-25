import { Modal } from '@gravity-ui/uikit'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { type Player } from '@lib/chess/core'
import styles from './finishModal.module.scss'

interface FinishModalProps {
  winner: Player
  handleFinishGame: (finished: boolean) => void
  handleStartGame: (started: boolean) => void
}

export const FinishModal = ({ winner, handleFinishGame, handleStartGame }: FinishModalProps) => {
  const [open, setOpen] = useState(true)

  const handleFinishButton = () => {
    setOpen(false)
    handleFinishGame(false)
    handleStartGame(false)
  }

  return (
    <Modal open={open} onClose={handleFinishButton}>
      <div className={styles.container}>
        <h2 className={styles.title}>Ура, победа!!!</h2>
        <h6 className={styles.subtitle}>Победил {winner.name}</h6>
        <div className={styles.links}>
          <Link className={styles.link} to="/game" onClick={handleFinishButton}>
            Начать новую игру
          </Link>
          <Link className={styles.link} to="/" onClick={handleFinishButton}>
            Вернуться в меню
          </Link>
        </div>
      </div>
    </Modal>
  )
}
