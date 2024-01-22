import { NavLink, useLocation } from 'react-router-dom'
import styles from './menuInner.module.scss'

interface Link {
  label: string
  to: string
}

interface MenuProps {
  links: Link[]
}

export const MenuInner = ({ links }: MenuProps) => {
  const location = useLocation()
  const curAddress = location.pathname
  return (
    <nav className={styles.menu}>
      <ul className={styles.links}>
        {links.map(link => (
          <NavLink key={link.to} to={link.to} className={curAddress == link.to ? styles.linkSelected : styles.link}>
            {link.label}
          </NavLink>
        ))}
      </ul>
    </nav>
  )
}
