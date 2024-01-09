import styles from './errorB.module.scss'

interface ErrorBProps {
  error: Error
  resetErrorBoundary: () => void
}
export const ErrorB = ({ error, resetErrorBoundary }: ErrorBProps) => {
  setTimeout(resetErrorBoundary, 2000)
  return !error.message ? (
    <> </>
  ) : (
    <div className={styles.errorContainer}>
      <div className={styles.errorInner}>
        <div className={styles.errorHeader}>Что-то пошло не так</div>
        <div className={styles.errorMessage}>{error.message}</div>
      </div>
    </div>
  )
}
