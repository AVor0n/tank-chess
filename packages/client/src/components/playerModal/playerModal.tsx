import { Button, Modal, RadioButton } from '@gravity-ui/uikit'
import { toaster } from '@gravity-ui/uikit/toaster-singleton-react-18'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormInput from '@components/formInput'
import { setPlayers, setRoomId } from 'reducers/game'
import { useAppDispatch, useAppSelector } from 'reducers/hooks'
import wsService from 'service/socket.service'
import { type Player } from 'types/types'
import styles from './playerModal.module.scss'

type GameMode = 'offline' | 'online'

export const PlayerModal = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const roomId = useAppSelector(state => state.game.roomId)
  const currentUser = useAppSelector(state => ({ id: state.auth.userInfo!.id, name: state.auth.userInfo!.login }))
  const [gameMode, setGameMode] = useState<GameMode>('offline')
  const [open, setOpen] = useState(true)
  const [opponentName, setOpponentName] = useState<string>('')

  const startGame = useCallback(
    (player1: Player, player2: Player) => {
      dispatch(setPlayers([player1, player2]))
      setOpen(false)
    },
    [dispatch],
  )

  const onStartGame = useCallback(() => {
    if (!opponentName) return
    startGame(currentUser, { name: opponentName })
  }, [currentUser, opponentName, startGame])

  const createGameSession = useCallback(() => {
    wsService.socket.emit('create-room', wsService.sessionId)
    wsService.socket.once('room-created', (room: string) => {
      dispatch(setRoomId(room))
    })
    wsService.socket.once('start', ({ player1, player2 }: Record<'player1' | 'player2', Player>) => {
      startGame(player1, player2)
    })
  }, [dispatch, startGame])

  const copyRoomLink = useCallback(
    (room: string) => {
      navigator.clipboard.writeText(`${window.location.origin}/game/${room}`)
      toaster.add({
        name: `${roomId}/copy-link`,
        title: 'Ссылка скопирована в буфер обмена',
        content: 'Игра начнется как только второй игрок перейдет по ссылке-приглашению',
      })
    },
    [roomId],
  )

  useEffect(() => {
    roomId && copyRoomLink(roomId)
  }, [copyRoomLink, roomId])

  const onChangeGameMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newGameMode = e.target.value as GameMode
    !roomId && createGameSession()
    setGameMode(newGameMode)
  }

  return (
    <Modal open={open}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Выбор оппонента</h2>

          <RadioButton
            size="l"
            width="max"
            value={gameMode}
            onChange={onChangeGameMode}
            options={[
              { value: 'offline', content: 'Оффлайн' },
              { value: 'online', content: 'Онлайн' },
            ]}
          />

          {gameMode === 'offline' && (
            <FormInput
              placeholder="Задайте имя второго игрока"
              name="login"
              onChange={setOpponentName}
              value={opponentName}
            />
          )}

          {gameMode === 'online' && (
            <FormInput
              value={`${window.location.origin}/game/${roomId}`}
              name="roomId"
              onFocus={() => copyRoomLink(roomId!)}
            />
          )}

          <div className={styles.actions}>
            {gameMode === 'offline' && (
              <Button
                onClick={onStartGame}
                view="action"
                pin="brick-brick"
                size="xl"
                width="max"
                disabled={!opponentName}>
                Далее
              </Button>
            )}
            <Button onClick={() => navigate('/')} view="normal" pin="brick-brick" size="xl" width="max">
              В главное меню
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
