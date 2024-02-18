import { clsx } from 'clsx'
import { type ReactNode } from 'react'
import styles from './container.module.scss'

interface ContainerProps {
  children?: ReactNode
  isCard?: boolean
  className?: string
}

export const Container = ({ children, isCard, className = '' }: ContainerProps) => (
  <div className={clsx(isCard ? styles.cardContainer : styles.pageContainer, className)}>
    <div className={isCard ? styles.card : styles.page}>{children}</div>
  </div>
)
