import { Button } from '@gravity-ui/uikit'
import { useNavigate } from 'react-router-dom'
import notFound from '@assets/images/notFound.png'
import serverError from '@assets/images/serverError.png'
import styles from './errorPage.module.scss'

interface ErrorPageProps {
  type: string
}

export const ErrorPage = ({ type }: ErrorPageProps) => {
  const navigate = useNavigate()

  return (
    <section className={styles.container}>
      <div className={styles.action}>
        <h2 className={styles.title}>
          Упс... <br />
          Что-то пошло не так
        </h2>
        <Button size="xl" className={styles.button} onClick={() => navigate(-1)}>
          Вернуться назад
        </Button>
        <p className={styles.subtitle}>или попробуйте позже</p>
      </div>
      <img src={type === 'Server Error' ? serverError : notFound} alt={type} className={styles.image} />
    </section>
  )
}
