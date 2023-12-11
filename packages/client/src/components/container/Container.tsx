import styles from './container.module.scss'
import { ThemeProvider } from '@gravity-ui/uikit'

export const Container = ({ children }) => {
  return (
    <ThemeProvider key="theme_provider" theme="light">
      <div className={styles.cardContainer}>
        <div className={styles.card}>{children}</div>
      </div>
    </ThemeProvider>
  )
}
