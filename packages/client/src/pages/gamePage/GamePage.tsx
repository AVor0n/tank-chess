import { useEffect, useRef, useState } from 'react'
import StartModal from '@components/startModal'
import { Game } from '@lib/chess'
import { ChessCanvasUI } from '@lib/reactChessUI'
import { GameInfo } from './components/Info'
import styles from './GamePage.module.scss'

const game = new Game()
const gameOptions = {
  playerName1: 'commander',
  playerName2: 'enemy',
}

export const GamePage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameStarted, setGameStarted] = useState(false)
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
      alert(`Победил: ${winner.name}`)
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
      {gameStarted ? <GameInfo game={game} /> : <StartModal startGame={onStartGame} />}
    </div>
  )
}
