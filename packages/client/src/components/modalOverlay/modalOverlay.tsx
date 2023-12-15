import { type FC } from 'react'
import styles from './modalOverlay.module.scss'

interface OverlayClick {
  onClick: () => void
}

export const ModalOverlay: FC<OverlayClick> = ({ onClick }) => <div className={styles.overlay} onClick={onClick} />

export default ModalOverlay