import { type ReactNode } from 'react'
import styles from './container.module.scss'

interface ContainerProps {
  children?: ReactNode
}

export const Container = ({ children }: ContainerProps) => (
  <div className={styles.cardContainer}>
    <div className={styles.card}>{children}</div>
  </div>
)
