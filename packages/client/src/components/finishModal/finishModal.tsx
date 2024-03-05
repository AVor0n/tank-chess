import { Modal } from '@gravity-ui/uikit'
import { Link } from 'react-router-dom'
import { resetGame } from 'reducers/game'
import { useAppDispatch, useAppSelector } from 'reducers/hooks'
import styles from './finishModal.module.scss'

export const FinishModal = () => {
  const userId = useAppSelector(state => state.auth.userInfo!.id)
  const { winner } = useAppSelector(state => state.game)
  const dispatch = useAppDispatch()
  const isWinner = winner?.id === userId

  const handleMainMenu = () => {
    dispatch(resetGame())
  }

  return (
    <Modal open>
      <div className={styles.container}>
        <h2 className={styles.title}>{isWinner ? 'Ура, победа!!!' : 'Поражение'}</h2>
        <h6 className={styles.subtitle}>Победил {winner?.name}</h6>
        <div className={styles.links}>
          <Link className={styles.link} to="/" onClick={handleMainMenu}>
            Вернуться в меню
          </Link>
        </div>
      </div>
    </Modal>
  )
}
