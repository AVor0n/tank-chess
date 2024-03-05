import { Modal, Button, Pagination } from '@gravity-ui/uikit'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { usePagination } from 'hook/usePagination'
import { initGame, setPlayers, setRoomId } from 'reducers/game'
import wsService from 'service/socket.service'
import { type Player } from 'types/types'
import { RULES_LIST } from './constants'
import GameRule from './gameRule'
import styles from './startModal.module.scss'

export const StartModal = () => {
  const { roomId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(true)
  const [currentPage, handleUpdate] = usePagination(1)

  useEffect(() => {
    if (roomId) {
      wsService.socket.emit('join-to-room', roomId)
      wsService.socket.once('start', ({ player1, player2 }: Record<'player1' | 'player2', Player>) => {
        dispatch(setRoomId(roomId))
        dispatch(
          setPlayers([
            { id: player1.id, name: player1.name },
            { id: player2.id, name: player2.name },
          ]),
        )
        navigate('/game')
      })
    }
  }, [dispatch, navigate, roomId])

  const handleStartButton = () => {
    setOpen(false)
    dispatch(initGame())
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
        <Button size="xl" className={styles.button} view="action" pin="brick-brick" onClick={handleStartButton}>
          Начать
        </Button>
      </div>
    </Modal>
  )
}
