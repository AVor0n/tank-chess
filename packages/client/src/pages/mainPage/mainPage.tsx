import { Menu } from '@components/menu'
import { MAIN_MENU_LINKS } from '@utils/constants'
import main from '@assets/images/main.png'
import styles from './mainPage.module.scss'

export const MainPage = () => (
  <section className={styles.main}>
    <div className={styles.content}>
      <h1 className={styles.title}>CHESS TANKS</h1>
      <Menu title="Основное меню" links={MAIN_MENU_LINKS} />
    </div>
    <img src={main} alt="Танки" className={styles.image} />
  </section>
)
