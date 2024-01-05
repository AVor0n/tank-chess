import { Modal } from '@gravity-ui/uikit'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { type Player } from '@lib/chess/core'
import { gameFinished, gameStarted, setSecondPlayer, setWinner } from 'reducers/gameStartFinish'
import { useDispatch } from 'reducers/hooks'
import styles from './finishModal.module.scss'

interface FinishModalProps {
  winner: Player
}

export const FinishModal = ({ winner }: FinishModalProps) => {
  const [open, setOpen] = useState(true)
  const dispatch = useDispatch()

  const handleNewGame = () => {
    setOpen(false)
    dispatch(gameFinished(false))
    dispatch(gameStarted(false))
    dispatch(setWinner(null))
  }

  const handleMainMenu = () => {
    setOpen(false)
    dispatch(gameFinished(false))
    dispatch(gameStarted(false))
    dispatch(setSecondPlayer(null))
    dispatch(setWinner(null))
  }

  return (
    <Modal open={open}>
      <div className={styles.container}>
        <h2 className={styles.title}>Ура, победа!!!</h2>
        <h6 className={styles.subtitle}>Победил {winner.name}</h6>
        <div className={styles.links}>
          <Link className={styles.link} to="/game" onClick={handleNewGame}>
            Начать новую игру
          </Link>
          <Link className={styles.link} to="/" onClick={handleMainMenu}>
            Вернуться в меню
          </Link>
        </div>
      </div>
    </Modal>
  )
}
