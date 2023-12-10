import { NavLink } from 'react-router-dom'
import styles from './menu.module.scss'

type Link = {
  label: string
  to: string
}

type MenuProps = {
  title: string
  links: Link[]
}

export const Menu = ({ title, links }: MenuProps) => {
  return (
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
}
