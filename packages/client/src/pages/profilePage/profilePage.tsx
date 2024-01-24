import { Table, type TableColumnConfig } from '@gravity-ui/uikit'
import { useContext } from 'react'
import LeftMenuPage from '@components/leftMenuPage'
import Form from '../../components/form'
import AuthContext from '../../context/authContext'
import { FormContext } from '../../context/formContext'
import userService from '../../service'
import AuthService from '../../service/auth.service'
import { type UserProfile } from '../../types/types'
import Avatar from './components/avatar'
import FormPassword from './components/formPassword'
import styles from './profilePage.module.scss'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data: any[] = [
  { name: 'Диванный танкист', score: '13000' },
  { name: 'Рыцарь башни и гусеницы ', score: '1000' },
  { name: 'Новичок', score: '100' },
]
const columns: TableColumnConfig<{
  id: string
  width: number
  align: string
  name: string
  score: string
}>[] = [
  { id: 'name', width: 370, name: 'Имя противника', align: 'left', primary: true },
  { id: 'score', width: 370, name: 'Счет', align: 'right' },
]

const onSendFormChangePassword = (data: Record<string, File | string>) => {
  userService.changePassword(data, data => {
    /* eslint no-console:0 */
    console.log(data)
  })
}

export const ProfilePage = ({ login, first_name, second_name, phone, email, avatar }: UserProfile) => {
  const { setAuth } = useContext(AuthContext)
  return (
    <LeftMenuPage>
      <div className={styles.profile}>
        <h1 className={styles.title}>Профиль пользователя</h1>
        <div className={styles.blockProfile}>
          <div className={styles.avatar}>
            <Avatar url={avatar ?? null} />
          </div>
          <div className={styles.about}>
            <div className={styles.row}>
              <div className={styles.muted}>Логин:</div> <div className={styles.personalValue}>{login}</div>
            </div>
            <div className={styles.row}>
              <div className={styles.muted}>Имя:</div> <div className={styles.personalValue}>{first_name}</div>
            </div>
            <div className={styles.row}>
              <div className={styles.muted}>Фамилия:</div> <div className={styles.personalValue}>{second_name}</div>
            </div>
            <div className={styles.row}>
              <div className={styles.muted}>E-mail:</div>
              <div className={styles.personalValue}>{email}</div>
            </div>
            <div className={styles.row}>
              <div className={styles.muted}>Телефон:</div>
              <div className={styles.personalValue}>{phone}</div>
            </div>
          </div>
        </div>

        <div className={styles.blockAchievment}>
          <h3 className={styles.title}>Мои достижения</h3>
          <Table data={data} columns={columns} edgePadding={false} />
        </div>

        <div className={styles.blockPassword}>
          <div className={styles.blockPasswordInner}>
            <Form onSubmit={onSendFormChangePassword}>
              <FormContext.Consumer>{state => <FormPassword {...state} />}</FormContext.Consumer>
            </Form>
          </div>
        </div>
        <div className={styles.logoutBlock}>
          <span
            className={styles.logoutBtn}
            onClick={() => {
              AuthService.logout(() => {
                setAuth(false)
              })
            }}>
            Выйти из профиля
          </span>
        </div>
      </div>
    </LeftMenuPage>
  )
}
