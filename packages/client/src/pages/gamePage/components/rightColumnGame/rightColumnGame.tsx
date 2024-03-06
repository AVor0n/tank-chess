import { NavLink } from 'react-router-dom'
import { type Game } from 'lib/chess'
import { resetGame } from 'reducers/game'
import { useAppDispatch, useAppSelector } from 'reducers/hooks'
import wsService from 'service/socket.service'
import { GameInfo } from '../info'
import SoundToggle from '../soundToggle'
import styles from './rightColumnGame.module.scss'

export const RightColumnGame = ({ game }: { game: Game }) => {
  const dispatch = useAppDispatch()
  const userId = useAppSelector(state => state.auth.userInfo!.id)
  const roomId = useAppSelector(state => state.game.roomId)
  const { sound } = useAppSelector(state => state.sound)

  const endGame = () => {
    dispatch(resetGame())
    roomId && wsService.socket.emit('sent-room-event', { event: 'endGame', roomId, userId })
  }

  return (
    <div className={styles.rightColumnGame}>
      <GameInfo game={game} />
      <div className={styles.rightColumn}>
        <SoundToggle withSound={sound} />
        <NavLink onClick={endGame} className={styles.exit} to="/">
          Завершить игру
        </NavLink>
      </div>
    </div>
  )
}
