import { useEffect, useRef } from 'react'
import { resetError } from 'reducers/error'
import { useAppDispatch, useAppSelector } from 'reducers/hooks'
import styles from './error.module.scss'

export const Error = () => {
  const dispatch = useAppDispatch()
  const error = useAppSelector(state => state.error)
  const timeoutId = useRef<number>()

  useEffect(() => {
    timeoutId.current = window.setTimeout(() => {
      dispatch(resetError())
    }, 10000)
    return () => {
      clearTimeout(timeoutId.current)
    }
  }, [dispatch])

  return !error.hasError
    ? null
    : error.hasError && (
        <div className={styles.errorContainer}>
          <div
            className={styles.resetError}
            onClick={() => {
              clearTimeout(timeoutId.current)
              dispatch(resetError())
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
