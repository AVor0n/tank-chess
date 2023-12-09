import { NavLink } from 'react-router-dom'
import styles from './menu.module.css'

export const Menu = () => {
  return (
    <nav className={styles.menu}>
      <h2 className={styles.subtitle}>Основное меню</h2>
      <ul className={styles.links}>
        <NavLink to="/game" className={styles.link}>
          Начать игру
        </NavLink>
        <NavLink to="/profile" className={styles.link}>
          Профиль
        </NavLink>
        <NavLink to="/rating" className={styles.link}>
          Лидербоард
        </NavLink>
        <NavLink to="/forum" className={styles.link}>
          Форум
        </NavLink>
      </ul>
    </nav>
  )
}
