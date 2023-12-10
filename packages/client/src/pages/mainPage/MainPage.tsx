import styles from './mainPage.module.scss'
import main from '../../assets/images/main.png'
import { MAIN_MENU_LINKS } from '../../utils/constants'
import Menu from '../../components/menu'

export const MainPage = () => {
  return (
    <section className={styles.main}>
      <div className={styles.content}>
        <h1 className={styles.title}>CHESS TANKS</h1>
        <Menu title="Основное меню" links={MAIN_MENU_LINKS} />
      </div>
      <img src={main} alt="Танки" className={styles.image} />
    </section>
  )
}
