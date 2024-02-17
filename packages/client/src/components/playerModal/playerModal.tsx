import { Button, Modal } from '@gravity-ui/uikit'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormInput from '@components/formInput'
import { selectorUserInfo } from 'reducers/auth'
import { setPlayers } from 'reducers/game'
import { useAppDispatch, useAppSelector } from 'reducers/hooks'
import styles from './playerModal.module.scss'

export const PlayerModal = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const currentUserInfo = useAppSelector(selectorUserInfo)
  const [open, setOpen] = useState(true)
  const [opponentName, setOpponentName] = useState('')

  const onStartGame = () => {
    dispatch(setPlayers([currentUserInfo!.login, opponentName || 'Player 2']))
    setOpen(false)
  }

  return (
    <Modal open={open}>
      <div className={styles.container}>
        <h2 className={styles.title}>Введите данные второго игрока</h2>
        <FormInput placeholder="Player 2" name="login" onChange={setOpponentName} value={opponentName} />

        <div className={styles.actions}>
          <Button className={styles.backBtn} onClick={() => navigate('/')} pin="brick-brick" size="xl">
            В главное меню
          </Button>
          <Button onClick={onStartGame} view="action" pin="brick-brick" size="xl">
            Далее
          </Button>
        </div>
      </div>
    </Modal>
  )
}
