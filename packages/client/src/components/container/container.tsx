import { type ReactNode } from 'react'
import styles from './container.module.scss'

interface ContainerProps {
  children?: ReactNode
  isCard?: boolean
}

export const Container = ({ children, isCard }: ContainerProps) => (
  <div className={isCard ? styles.cardContainer : styles.pageContainer}>
    <div className={isCard ? styles.card : styles.page}>{children}</div>
  </div>
)
