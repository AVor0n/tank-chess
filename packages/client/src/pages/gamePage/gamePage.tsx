import { Modal } from '@gravity-ui/uikit'
import React, { useEffect, useState } from 'react'
import Board from '../../components/board'
import StartModal from '../../components/startModal'
import styles from './gamePage.module.scss'

const modalContainer = document.getElementById('modal')!

export const GamePage = () => {
  const [, setIsGameStarted] = useState(false)
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    setOpen(true)
  }, [])

  const handleGameStart = () => {
    setIsGameStarted(true)
  }

  return (
    <section className={styles.container}>
      <Modal open={open} onClose={() => setOpen(false)} container={modalContainer}>
        <StartModal startGame={handleGameStart} closeModal={() => setOpen(false)} />
      </Modal>
      <Board />
    </section>
  )
}
