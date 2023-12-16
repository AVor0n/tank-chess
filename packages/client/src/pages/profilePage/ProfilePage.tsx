import Menu from '../../components/menu'
import { MAIN_MENU_LINKS } from '../../utils/constants'
import styles from './profilePage.module.scss'
import Avatar from '../../components/avatar'
import { TextInput, Button } from '@gravity-ui/uikit'
import Form from '../../components/form'
import { FormContext } from '../../context/formContext'
import { Table } from '@gravity-ui/uikit'
import userService from '../../components/service'
import { User } from '../../types/types'
import { ToastProps } from '@gravity-ui/uikit/build/esm/components/Toaster/types'

const data = [
  { name: 'Диванный танкист', score: '13000' },
  { name: 'Рыцарь башни и гусеницы ', score: '1000' },
  { name: 'Новичок', score: '100' },
]
const columns = [{ id: 'name' }, { id: 'score' }]

const onSendFormChangePassword = (
  data: Record<string, any>,
  toaster: (props: ToastProps) => void
) => {
  userService.changePassword(data, data => {
    const notification: ToastProps = {
      name: '',
      title: 'Данные успешно отправлены',
      type: 'success',
    }

    toaster(notification)
  })
}

type propsForm = {
  state: Record<string, any>
  error: Record<string, any>
  isValid: boolean
  touched: boolean
}

const FormPassword = ({ state, error, isValid, touched }: propsForm) => {
  return (
    <div className={styles.profile__password}>
      <h3>Поменять пароль</h3>
      <div>
        <TextInput
          name="oldPassword"
          placeholder="Текущий пароль"
          type="password"
          view="normal"
          pin="round-round"
          value={state.oldPassword}
          errorMessage={error.oldPassword}
          validationState={error.oldPassword ? 'invalid' : undefined}
        />
      </div>
      <div>
        <TextInput
          name="newPassword"
          view="normal"
          placeholder="Новый пароль"
          type="password"
          pin="round-round"
          value={state.newPassword}
          errorMessage={error.newPassword}
          validationState={error.newPassword ? 'invalid' : undefined}
        />
      </div>
      <Button
        view="action"
        size="l"
        type="submit"
        disabled={!touched || !isValid}>
        Сохранить
      </Button>
    </div>
  )
}

export const ProfilePage = ({
  login,
  first_name,
  second_name,
  phone,
  email,
  avatar,
}: User) => {
  return (
    <section className={styles.main}>
      <div>
        <h1 className={styles.title}>Профиль пользователя</h1>
        <Menu title="Основное меню" links={MAIN_MENU_LINKS} />
      </div>
      <div className={styles.content}>
        <div className={styles.profile}>
          <div>
            <Avatar url={avatar || null} />
          </div>
          <div className={styles.profile__about}>
            <h3>Профиль</h3>
            <div>
              <span className={styles.muted}>Логин:</span> {login}
            </div>
            <div>
              <span className={styles.muted}>Имя:</span> {first_name}
            </div>
            <div>
              <span className={styles.muted}>Фамилия:</span> {second_name}
            </div>
            <div>
              <span className={styles.muted}>email:</span>
              {email}
            </div>
            <div>
              <span className={styles.muted}>Телефон:</span>
              {phone}
            </div>
            <hr />
            <h3>Мои достижения</h3>
            <Table data={data} columns={columns} />
            <hr />
            <Form onSubmit={onSendFormChangePassword}>
              <FormContext.Consumer>
                {state => <FormPassword {...state} />}
              </FormContext.Consumer>
            </Form>
          </div>
        </div>
      </div>
    </section>
  )
}
