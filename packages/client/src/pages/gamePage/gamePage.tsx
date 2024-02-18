import { type ReactNode, useEffect, useRef, useState, useMemo } from 'react'
import FinishModal from '@components/finishModal'
import PlayerModal from '@components/playerModal'
import StartModal from '@components/startModal'
import { Game } from '@lib/chess'
import { ChessCanvasUI } from '@lib/reactChessUI'
import { useApiErrorToast } from 'hook/useApiErrorToast'
import { api } from 'reducers/api'
import { GameStatus, finishGame, startGame } from 'reducers/game'
import { useAppDispatch, useAppSelector } from 'reducers/hooks'
import { GameInfo } from './components/info'
import { getGameResult } from './utils'
import styles from './gamePage.module.scss'

const gameComponent: (game: Game) => Record<GameStatus, ReactNode> = game => ({
  [GameStatus.NO_INIT]: <StartModal />,
  [GameStatus.SETUP]: <PlayerModal />,
  [GameStatus.READY_TO_START]: null,
  [GameStatus.IN_PROGRESS]: <GameInfo game={game} />,
  [GameStatus.FINISHED]: <FinishModal game={game} />,
})

export const GamePage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [uiController, setUiController] = useState<ChessCanvasUI | null>(null)
  const game = useMemo(() => new Game(), [])

  const dispatch = useAppDispatch()
  const gameStatus = useAppSelector(state => state.game.status)
  const { status, players } = useAppSelector(state => state.game)
  const [saveResult, { error }] = api.useSaveGameResultMutation()
  useApiErrorToast(error)

  useEffect(() => {
    if (status !== GameStatus.READY_TO_START) return

    dispatch(startGame())
    game.startGame({
      playerName1: players[0] ?? 'player_1',
      playerName2: players[1] ?? 'player_2',
    })
    game.on('endGame', winner => {
      dispatch(finishGame(winner.name))
      const currentPlayerWin = winner.id === game.players[0].id
      if (currentPlayerWin) {
        saveResult(getGameResult(game, winner))
      }
    })
  }, [dispatch, game, players, saveResult, status])

  useEffect(() => {
    if (gameStatus > GameStatus.SETUP && canvasRef.current && !uiController) {
      setUiController(new ChessCanvasUI(game, canvasRef.current, screen.availHeight * 0.85))
    }
    uiController?.refresh()
  }, [game, gameStatus, uiController])

  return (
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
  )
}
