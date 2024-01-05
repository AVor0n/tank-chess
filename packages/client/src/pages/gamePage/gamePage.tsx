import { useEffect, useRef, useState } from 'react'
import FinishModal from '@components/finishModal'
import PlayerModal from '@components/playerModal'
import StartModal from '@components/startModal'
import { Game } from '@lib/chess'
import { ChessCanvasUI } from '@lib/reactChessUI'
import { gameFinished, gameStarted, setWinner } from 'reducers/gameStartFinish'
import { useDispatch, useSelector } from 'reducers/hooks'
import { GameInfo } from './components/info'
import styles from './gamePage.module.scss'

const game = new Game()
const gameOptions = {
  playerName1: 'commander',
  playerName2: 'enemy',
}

export const GamePage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { isGameFinished, isGameStarted, winner, secondPlayer } = useSelector(store => store.gameStartFinishData)
  const [uiController, setUiController] = useState<ChessCanvasUI | null>(null)

  const dispatch = useDispatch()

  const onStartGame = () => {
    game.startGame(gameOptions)

    dispatch(gameStarted(true))
  }

  useEffect(() => {
    if (isGameStarted && canvasRef.current && !uiController) {
      setUiController(new ChessCanvasUI(game, canvasRef.current, screen.availHeight * 0.85))
    }

    uiController?.refresh()
  }, [isGameStarted, uiController])

  useEffect(() => {
    const disposer = game.on('endGame', winner => {
      dispatch(gameFinished(true))
      dispatch(setWinner(winner))
      game.resetGame()
      game.startGame(gameOptions)
    })
    return () => disposer()
  })

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
      {isGameFinished && <FinishModal winner={winner!} />}
      {!secondPlayer?.login && isGameStarted && <PlayerModal />}
      {isGameStarted ? <GameInfo game={game} /> : <StartModal startGame={onStartGame} />}
    </div>
  )
}
