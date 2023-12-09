import styles from './mainPage.module.css'
import main from '../../assets/images/main.png'
import { Menu } from '../../components/menu/Menu'

export const MainPage = () => {
  return (
    <section className={styles.main}>
      <div className={styles.content}>
        <h1 className={styles.title}>CHESS TANKS</h1>
        <Menu />
      </div>
      <img src={main} alt="Танки" />
    </section>
  )
}
