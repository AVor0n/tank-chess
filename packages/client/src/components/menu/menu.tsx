import { NavLink } from 'react-router-dom'
import styles from './menu.module.scss'

interface Link {
  label: string
  to: string
}

interface MenuProps {
  title: string
  links: Link[]
}

export const Menu = ({ title, links }: MenuProps) => (
  <nav className={styles.menu}>
    <h2 className={styles.subtitle}>{title}</h2>
    <ul className={styles.links}>
      {links.map(link => (
        <NavLink key={link.to} to={link.to} className={styles.link}>
          {link.label}
        </NavLink>
      ))}
    </ul>
  </nav>
)
