import { Modal } from '@gravity-ui/uikit'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Form from '@components/form'
import { FormContext } from 'context/formContext'
import { setSecondPlayer } from 'reducers/game'
import { useAppDispatch } from 'reducers/hooks'
import FormPost from './components/formPlayer'
import styles from './playerModal.module.scss'

export const PlayerModal = () => {
  const [open, setOpen] = useState(true)
  const dispatch = useAppDispatch()

  const onAddSecondUser = (data: Record<string, File | string | number>) => {
    dispatch(setSecondPlayer(data))
    setOpen(false)
  }

  return (
    <Modal open={open}>
      <div className={styles.container}>
        <h2 className={styles.title}>Введите данные второго игрока</h2>
        <Form onSubmit={onAddSecondUser}>
          <FormContext.Consumer>{state => <FormPost {...state} />}</FormContext.Consumer>
        </Form>
        <div className={styles.links}>
          <Link className={styles.link} to="/">
            Вернуться в главное меню
          </Link>
        </div>
      </div>
    </Modal>
  )
}
