import { type ReactNode } from 'react'
import Container from '@components/container'
import MenuInner from '@components/menuInner'
import ThemeToggle from '@components/themeToggle'
import { MAIN_MENU_LINKS } from '@utils/constants'
import styles from './leftMenuPage.module.scss'

interface ContainerProps {
  children?: ReactNode
}

export const LeftMenuPage = ({ children }: ContainerProps) => (
  <Container>
    <section className={styles.main}>
      <div className={styles.leftMenu}>
        <ThemeToggle className={styles.themeToggle} />
        <MenuInner links={MAIN_MENU_LINKS} />
      </div>
      <div className={styles.content}>{children}</div>
    </section>
  </Container>
)
