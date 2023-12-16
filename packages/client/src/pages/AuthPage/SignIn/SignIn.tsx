import { Button } from '@gravity-ui/uikit'
import { type FC, useState } from 'react'
import FormInput from '../../../components/FormInput'
import { type signInDataType } from '../../../utils/types'
import styles from './signin.module.scss'

const submit = (data: signInDataType) => data

export const SignIn: FC = () => {
  const [signInData, setSignInData] = useState({
    login: '',
    password: '',
  })
  return (
    <form className={styles.form}>
      <FormInput
        key="login"
        placeholder="Логин"
        name="login"
        onChange={(login: string) => setSignInData({ ...signInData, login })}
      />
      <FormInput
        key="password"
        placeholder="Пароль"
        name="password"
        type="password"
        onChange={(password: string) => setSignInData({ ...signInData, password })}
      />
      <Button
        className={styles.submitBtn}
        view="action"
        width="max"
        pin="brick-brick"
        size="xl"
        onClick={() => submit(signInData)}>
        Войти
      </Button>
    </form>
  )
}
