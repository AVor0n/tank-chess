import { useEffect, useRef, useState } from 'react'
import FinishModal from '@components/finishModal'
import StartModal from '@components/startModal'
import { Game } from '@lib/chess'
import { type Player } from '@lib/chess/core'
import { ChessCanvasUI } from '@lib/reactChessUI'
import { GameInfo } from './components/info'
import styles from './gamePage.module.scss'

const game = new Game()
const gameOptions = {
  playerName1: 'commander',
  playerName2: 'enemy',
}

export const GamePage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)
  const [winner, setWinner] = useState<Player>()
  const [uiController, setUiController] = useState<ChessCanvasUI | null>(null)

  const onStartGame = () => {
    game.startGame(gameOptions)

    setGameStarted(true)
  }

  useEffect(() => {
    if (gameStarted && canvasRef.current && !uiController) {
      setUiController(new ChessCanvasUI(game, canvasRef.current, screen.availHeight * 0.85))
    }

    uiController?.refresh()
  }, [gameStarted, uiController])

  useEffect(() => {
    const disposer = game.on('endGame', winner => {
      setGameFinished(true)
      setWinner(winner)
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
      {gameFinished && (
        <FinishModal winner={winner!} handleFinishGame={setGameFinished} handleStartGame={setGameStarted} />
      )}
      {gameStarted ? <GameInfo game={game} /> : <StartModal startGame={onStartGame} />}
    </div>
  )
}
