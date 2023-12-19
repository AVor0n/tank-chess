import { Table } from '@gravity-ui/uikit'
import { Menu } from '@components/menu'
import { MAIN_MENU_LINKS } from '@utils/constants'
import Form from '../../components/form'
import { FormContext } from '../../context/formContext'
import userService from '../../service'
import { type User } from '../../types/types'
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

export const ProfilePage = ({ login, first_name, second_name, phone, email, avatar }: User) => (
  <section className={styles.main}>
    <div>
      <h1 className={styles.title}>Профиль пользователя</h1>
      <Menu title="Основное меню" links={MAIN_MENU_LINKS} />
    </div>
    <div className={styles.content}>
      <div className={styles.profile}>
        <div>
          <Avatar url={avatar ?? null} />
        </div>
        <div className={styles.about}>
          <h3 className={styles.title}>Профиль</h3>
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
          <h3 className={styles.title}>Мои достижения</h3>
          <Table data={data} columns={columns} />
          <hr />
          <Form onSubmit={onSendFormChangePassword}>
            <FormContext.Consumer>{state => <FormPassword {...state} />}</FormContext.Consumer>
          </Form>
        </div>
      </div>
    </div>
  </section>
)
