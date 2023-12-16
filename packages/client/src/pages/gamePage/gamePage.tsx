import { useState } from 'react'
import StartModal from '../../components/startModal'
import styles from './gamePage.module.scss'

export const GamePage = () => {
  const [gameStarted, setIsGameStarted] = useState(false)

  const handleGameStart = () => {
    setIsGameStarted(true)
  }

  return <section className={styles.container}>{!gameStarted && <StartModal startGame={handleGameStart} />}</section>
}
