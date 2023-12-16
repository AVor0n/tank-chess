import { Link, Button } from '@gravity-ui/uikit'
import { type FC, useState } from 'react'
import FormInput from '../../../components/FormInput'
import { type signUpDataType } from '../../../utils/types'
import styles from './ SignUp.module.scss'

interface SignUpProps {
  backSignIn?: () => void
}

const submit = (data: signUpDataType) =>
  //data.append
  data

export const SignUp: FC<SignUpProps> = ({ backSignIn }) => {
  const [signUpData, signUpDataSet] = useState({
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    phone: '',
    password: '',
  })
  return (
    <form className={styles.form}>
      <FormInput
        placeholder="Имя"
        name="first_name"
        onChange={(first_name: string) => signUpDataSet({ ...signUpData, first_name })}
      />
      <FormInput
        placeholder="Фамилия"
        name="second_name"
        onChange={(second_name: string) => signUpDataSet({ ...signUpData, second_name })}
      />
      <FormInput
        placeholder="Логин"
        name="login"
        onChange={(login: string) => signUpDataSet({ ...signUpData, login })}
      />
      <FormInput
        placeholder="E-mail"
        name="email"
        onChange={(email: string) => signUpDataSet({ ...signUpData, email })}
      />
      <FormInput
        placeholder="Телефон"
        name="password"
        onChange={(phone: string) => signUpDataSet({ ...signUpData, phone })}
      />
      <FormInput
        placeholder="Пароль"
        name="password"
        type="password"
        onChange={(password: string) => signUpDataSet({ ...signUpData, password })}
      />

      <Button
        className={styles.submitBtn}
        view="action"
        width="max"
        pin="brick-brick"
        size="xl"
        onClick={() => {
          submit(signUpData)
        }}>
        Зарегистрироваться
      </Button>
      {backSignIn ? (
        <div className={styles.addLink}>
          <Link onClick={backSignIn}>Авторизация</Link>
        </div>
      ) : null}
    </form>
  )
}
