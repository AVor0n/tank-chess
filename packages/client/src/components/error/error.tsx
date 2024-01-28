import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectError, resetError } from 'reducers/error'
import store from 'store'
import styles from './error.module.scss'

export const Error = () => {
  const error = useSelector(selectError)
  let timeoutId: ReturnType<typeof setTimeout>
  useEffect(() => {
    timeoutId = setTimeout(() => {
      store.dispatch(resetError())
    }, 10000)
    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  return !error.hasError
    ? null
    : error.hasError && (
        <div className={styles.errorContainer}>
          <div
            className={styles.resetError}
            onClick={() => {
              clearTimeout(timeoutId)
              store.dispatch(resetError())
            }}>
            &times;
          </div>
          <div data-test="error" className={styles.errorInner}>
            <div className={styles.errorHeader}>Что-то пошло не так...</div>
            <div className={styles.errorMessage}>{error.message}</div>
          </div>
        </div>
      )
}
