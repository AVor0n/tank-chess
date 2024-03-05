import { toaster } from '@gravity-ui/uikit/toaster-singleton-react-18'
import { type ReactNode, useEffect, useRef, useState, useMemo } from 'react'
import FinishModal from '@components/finishModal'
import PlayerModal from '@components/playerModal'
import StartModal from '@components/startModal'
import { type ACTION_TYPE, Game, Player } from '@lib/chess'
import { ChessCanvasUI } from '@lib/reactChessUI'
import { useApiErrorToast } from 'hook/useApiErrorToast'
import { api } from 'reducers/api'
import { GameStatus, finishGame, resetGame, startGame } from 'reducers/game'
import { useAppDispatch, useAppSelector } from 'reducers/hooks'
import wsService from 'service/socket.service'
import RightColumnGame from './components/rightColumnGame'
import { getGameResult } from './utils'
import styles from './gamePage.module.scss'

const gameComponent: (game: Game) => Record<GameStatus, ReactNode> = game => ({
  [GameStatus.NO_INIT]: <StartModal />,
  [GameStatus.SETUP]: <PlayerModal />,
  [GameStatus.READY_TO_START]: null,
  [GameStatus.IN_PROGRESS]: <RightColumnGame game={game} />,
  [GameStatus.FINISHED]: <FinishModal />,
})

export const GamePage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [uiController, setUiController] = useState<ChessCanvasUI | null>(null)
  const game = useMemo(() => new Game(), [])

  const dispatch = useAppDispatch()
  const roomId = useAppSelector(state => state.game.roomId)
  const userId = useAppSelector(state => state.auth.userInfo?.id)
  const gameStatus = useAppSelector(state => state.game.status)
  const { status, players } = useAppSelector(state => state.game)
  const [saveResult, { error }] = api.useSaveGameResultMutation()
  useApiErrorToast(error)

  const { sound } = useAppSelector(state => state.sound)
  useEffect(() => {
    if (uiController) {
      uiController.changeSound(sound)
    }
  }, [sound])

  useEffect(
    () => () => {
      dispatch(resetGame())
      game.resetGame()
    },
    [dispatch, game],
  )

  useEffect(() => {
    if (status !== GameStatus.READY_TO_START) return

    dispatch(startGame())
    game.startGame({
      player1: new Player(players[0]?.name ?? 'player_1', players[0]?.id),
      player2: new Player(players[1]?.name ?? 'player_2', players[1]?.id),
    })
    game.on('endGame', winner => {
      dispatch(finishGame({ id: winner.id, name: winner.name }))
      const currentPlayerWin = winner.id === game.players[0].id
      if (currentPlayerWin) {
        saveResult(getGameResult(game, winner))
      }
    })
  }, [dispatch, game, players, saveResult, status])

  useEffect(() => {
    if (gameStatus > GameStatus.SETUP && canvasRef.current && !uiController) {
      const playerId = roomId ? userId : undefined
      setUiController(
        new ChessCanvasUI(game, canvasRef.current, screen.availHeight * 0.85, sound, './sounds/', playerId),
      )
    }
    uiController?.refresh()
  }, [game, gameStatus, roomId, sound, uiController, userId])

  useEffect(() => {
    if (roomId) {
      game.on('willPerformAction', action => {
        wsService.socket.emit('sent-room-event', { event: 'willPerformAction', roomId, payload: action })
      })
      game.on('onChangeActiveTank', activeTank => {
        wsService.socket.emit('sent-room-event', { event: 'onChangeActiveTank', roomId, payload: activeTank?.id })
      })
      game.on('endGame', () => {
        wsService.socket.emit('sent-room-event', { event: 'endGame', roomId })
      })

      wsService.socket.on('willPerformAction', (action: ACTION_TYPE) => {
        if (game.activePlayer.id === userId) return
        game.activeTank && game.makeMove(action)
      })
      wsService.socket.on('onChangeActiveTank', (activeTankId: string) => {
        if (game.activePlayer.id === userId) return
        game.setActiveTank(activeTankId)
      })
      wsService.socket.on('endGame', () =>
        toaster.add({
          name: `${roomId}/endGame`,
          isClosable: true,
          title: 'Игра завешена',
        }),
      )
    }
  }, [game, roomId, userId])

  return (
    <div className={styles.gameContainer}>
      <div className={styles.game}>
        <canvas
          className={styles.board}
          ref={canvasRef}
          width={uiController?.canvasSize}
          height={uiController?.canvasSize}
          onClick={e => uiController?.onMouseClick(e)}
          onMouseMove={e => uiController?.onMouseMove(e)}
        />
        {gameComponent(game)[gameStatus]}
      </div>
    </div>
  )
}
