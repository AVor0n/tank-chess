import { Menu } from '@components/menu'
import { MAIN_MENU_LINKS } from '@utils/constants'
import styles from './mainPage.module.scss'

export const MainPage = () => (
  <section className={styles.main}>
    <div className={styles.content}>
      <div className={styles.contentInner}>
        <h1 className={styles.title}>CHESS TANKS</h1>
        <Menu links={MAIN_MENU_LINKS} />
      </div>
    </div>
    <div className={styles.image} />
  </section>
)
