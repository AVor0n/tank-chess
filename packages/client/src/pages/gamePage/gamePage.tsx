import React, { useEffect, useState } from 'react'
import styles from '/gamePage.module.scss'
import Board from '../../components/board'
import { Modal } from '@gravity-ui/uikit'
import StartModal from '../../components/startModal'

const modalContainer = document.getElementById('modal') as HTMLElement

export const GamePage = () => {
  const [gameStarted, setIsGameStarted] = useState(false)
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    setOpen(true)
  }, [])

  const handleGameStart = () => {
    setIsGameStarted(true)
  }

  return (
    <section className={styles.container}>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        children={
          <StartModal
            startGame={handleGameStart}
            closeModal={() => setOpen(false)}
          />
        }
        container={modalContainer}
      />
      <Board />
    </section>
  )
}
