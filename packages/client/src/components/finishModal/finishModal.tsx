import { Modal } from '@gravity-ui/uikit'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { type Game } from '@lib/chess'
import { resetGame, startGame } from 'reducers/game'
import { useAppDispatch, useAppSelector } from 'reducers/hooks'
import styles from './finishModal.module.scss'

interface FinisModalProps {
  game: Game
}

export const FinishModal = ({ game }: FinisModalProps) => {
  const [open, setOpen] = useState(true)
  const { players, winnerName } = useAppSelector(state => state.game)
  const dispatch = useAppDispatch()

  const handleNewGame = () => {
    setOpen(false)
    game.resetGame()
    game.startGame({
      playerName1: players[0] ?? 'Player 1',
      playerName2: players[1] ?? 'Player 2',
    })
    dispatch(startGame())
  }

  const handleMainMenu = () => {
    dispatch(resetGame())
  }

  return (
    <Modal open={open}>
      <div className={styles.container}>
        <h2 className={styles.title}>Ура, победа!!!</h2>
        <h6 className={styles.subtitle}>Победил {winnerName}</h6>
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
