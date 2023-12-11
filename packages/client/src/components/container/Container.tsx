import { ReactNode } from 'react'
import styles from './container.module.scss'
import { ThemeProvider } from '@gravity-ui/uikit'

interface ContainerProps {
  children?: ReactNode
}

export const Container = ({ children }: ContainerProps) => {
  return (
    <ThemeProvider key="theme_provider" theme="light">
      <div className={styles.cardContainer}>
        <div className={styles.card}>{children}</div>
      </div>
    </ThemeProvider>
  )
}
