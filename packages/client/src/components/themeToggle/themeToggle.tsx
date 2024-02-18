import { clsx } from 'clsx'
import { api } from 'reducers/api'
import { selectorIsAuth } from 'reducers/auth'
import { useAppDispatch, useAppSelector } from 'reducers/hooks'
import { setTheme } from 'reducers/theme'
import styles from './themeToggle.module.scss'

interface ThemeToggleProps {
  className?: string
}

export const ThemeToggle = ({ className = '' }: ThemeToggleProps) => {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(selectorIsAuth)
  const { theme } = useAppSelector(state => state.theme)
  const [setThemeMutation] = api.useSetThemeMutation()
  const checked = theme === 'dark'

  const onToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    dispatch(setTheme(newTheme))
    if (isAuth) {
      setThemeMutation(newTheme)
    }
  }

  return (
    <div className={`${styles.toggleWrapper} ${className}`}>
      <label className={clsx(styles.toggle, checked && styles.checked)}>
        <span className={styles.toggle__handler}>
          <span className={styles.crater} />
          <span className={styles.crater} />
          <span className={styles.crater} />
        </span>
        <span className={styles.star} />
        <span className={styles.star} />
        <span className={styles.star} />
        <span className={styles.star} />
        <span className={styles.star} />
        <span className={styles.star} />
        <input type="checkbox" checked={checked} onChange={onToggle} />
      </label>
    </div>
  )
}
