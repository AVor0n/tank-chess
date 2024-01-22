import { Table, Button } from '@gravity-ui/uikit'
import { useContext } from 'react'
import Container from '@components/container'
import MenuInner from '@components/menuInner'
import { MAIN_MENU_LINKS } from '@utils/constants'
import Form from '../../components/form'
import AuthContext from '../../context/authContext'
import { FormContext } from '../../context/formContext'
import userService from '../../service'
import AuthService from '../../service/auth.service'
import { type UserProfile } from '../../types/types'
import Avatar from './components/avatar'
import FormPassword from './components/formPassword'
import styles from './profilePage.module.scss'

const data = [
  { name: 'Диванный танкист', score: '13000' },
  { name: 'Рыцарь башни и гусеницы ', score: '1000' },
  { name: 'Новичок', score: '100' },
]
const columns = [{ id: 'name' }, { id: 'score' }]

const onSendFormChangePassword = (data: Record<string, File | string>) => {
  userService.changePassword(data, data => {
    /* eslint no-console:0 */
    console.log(data)
  })
}

export const ProfilePage = ({ login, first_name, second_name, phone, email, avatar }: UserProfile) => {
  const { setAuth } = useContext(AuthContext)
  return (
    <Container>
      <section className={styles.main}>
        <div className={styles.leftMenu}>
          <MenuInner links={MAIN_MENU_LINKS} />
        </div>
        <div className={styles.content}>
          <div className={styles.profile}>
            <h1 className={styles.title}>Профиль пользователя</h1>
            <div className={styles.blockProfile}>
              <div>
                <Avatar url={avatar ?? null} />
              </div>
              <div className={styles.about}>
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
              </div>
            </div>

            <div>
              <hr />
              <h3 className={styles.title}>Мои достижения</h3>
              <Table data={data} columns={columns} />
              <hr />
              <Form onSubmit={onSendFormChangePassword}>
                <FormContext.Consumer>{state => <FormPassword {...state} />}</FormContext.Consumer>
              </Form>
              <div className={styles.logout}>
                <Button
                  view="action"
                  width="max"
                  size="xl"
                  onClick={() => {
                    AuthService.logout(() => {
                      setAuth(false)
                    })
                  }}>
                  Выйти
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  )
}
