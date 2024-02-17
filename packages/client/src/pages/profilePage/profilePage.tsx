import LeftMenuPage from '@components/leftMenuPage'
import PageLoader from '@components/pageLoader'
import { useApiErrorToast } from 'hook/useApiErrorToast'
import { api } from 'reducers/api'
import { selectorUserInfo } from 'reducers/auth'
import { useAppSelector } from 'reducers/hooks'
import NotificationServiceInstance from 'service/notification.service'
import { type ChangePasswordPayload } from 'types/types'
import Form from '../../components/form'
import { FormContext } from '../../context/formContext'
import Avatar from './components/avatar'
import FormPassword from './components/formPassword'
import styles from './profilePage.module.scss'

export const ProfilePage = () => {
  const user = useAppSelector(selectorUserInfo)
  const [logout, { error: logoutError }] = api.useLogoutMutation()
  const [changePassword] = api.useChangePasswordMutation()
  useApiErrorToast(logoutError)

  if (!user) return <PageLoader />

  return (
    <LeftMenuPage>
      <div className={styles.profile}>
        <h1 className={styles.title}>Профиль пользователя</h1>
        <div className={styles.blockProfile}>
          <div className={styles.avatar}>
            <Avatar url={user.avatar ?? null} />
          </div>
          <div className={styles.about}>
            <div className={styles.row}>
              <div className={styles.muted}>Логин:</div>
              <div className={styles.personalValue}>{user.login}</div>
            </div>
            <div className={styles.row}>
              <div className={styles.muted}>Имя:</div>
              <div className={styles.personalValue}>{user.first_name}</div>
            </div>
            <div className={styles.row}>
              <div className={styles.muted}>Фамилия:</div>
              <div className={styles.personalValue}>{user.second_name}</div>
            </div>
            <div className={styles.row}>
              <div className={styles.muted}>E-mail:</div>
              <div className={styles.personalValue}>{user.email}</div>
            </div>
            <div className={styles.row}>
              <div className={styles.muted}>Телефон:</div>
              <div className={styles.personalValue}>{user.phone}</div>
            </div>
          </div>
        </div>

        <div className={styles.blockPassword}>
          <div className={styles.blockPasswordInner}>
            <Form<ChangePasswordPayload>
              onSubmit={data => {
                changePassword(data)
                  .unwrap()
                  .then(() => {
                    NotificationServiceInstance.show('Изменение пароля', {
                      body: 'Пароль успешно изменен',
                    })
                  })
                  .catch(() => {
                    NotificationServiceInstance.show('Изменение пароля', {
                      body: 'Не удалось изменить пароль',
                    })
                  })
              }}>
              <FormContext.Consumer>{state => <FormPassword {...state} />}</FormContext.Consumer>
            </Form>
          </div>
        </div>

        <div className={styles.logoutBlock}>
          <span
            className={styles.logoutBtn}
            onClick={() => {
              logout()
            }}>
            Выйти из профиля
          </span>
        </div>
      </div>
    </LeftMenuPage>
  )
}
