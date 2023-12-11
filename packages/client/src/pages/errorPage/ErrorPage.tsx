import { Button } from '@gravity-ui/uikit'
import { useNavigate } from 'react-router-dom'
import notFound from '../../assets/images/notFound.png'
import styles from './errorPage.module.scss'

export const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <section className={styles.container}>
      <div className={styles.action}>
        <h2 className={styles.title}>
          Упс... <br />
          Что-то пошло не так
        </h2>
        <Button
          size="xl"
          className={styles.button}
          onClick={() => navigate(-1)}>
          Вернуться назад
        </Button>
      </div>
      <img src={notFound} alt="Not Found" className={styles.image} />
    </section>
  )
}
