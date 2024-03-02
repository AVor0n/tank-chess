import { NavLink } from 'react-router-dom'
import { type Game } from 'lib/chess'
import { resetGame } from 'reducers/game'
import { useAppDispatch, useAppSelector } from 'reducers/hooks'
import { GameInfo } from '../info'
import SoundToggle from '../soundToggle'
import styles from './rightColumnGame.module.scss'

export const RightColumnGame = ({ game }: { game: Game }) => {
  const dispatch = useAppDispatch()
  const { sound } = useAppSelector(state => state.sound)
  return (
    <div className={styles.rightColumnGame}>
      <GameInfo game={game} />
      <div className={styles.rightColumn}>
        <SoundToggle withSound={sound} />
        <NavLink onClick={() => dispatch(resetGame())} className={styles.exit} to="/">
          Завершить игру
        </NavLink>
      </div>
    </div>
  )
}
