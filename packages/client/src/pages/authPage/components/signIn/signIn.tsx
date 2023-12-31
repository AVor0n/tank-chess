import { Button } from '@gravity-ui/uikit'
import { useState } from 'react'
import FormInput from '@components/formInput'
import { type FormProps } from '../../../../types/types'
import styles from './signIn.module.scss'

export const SignIn = ({ state, error, isValid, touched }: FormProps) => {
  const [signInData, setSignInData] = useState({
    login: '',
    password: '',
  })
  //console.log(touched, isValid);
  return (
    <div className={styles.form}>
      <FormInput
        key="login"
        placeholder="Логин"
        name="login"
        onChange={(login: string) => setSignInData({ ...signInData, login })}
        value={state.login}
        errorMessage={error.login}
        validationState={error.login ? 'invalid' : undefined}
      />
      <FormInput
        key="password"
        placeholder="Пароль"
        name="password"
        type="password"
        onChange={(password: string) => setSignInData({ ...signInData, password })}
        value={state.password}
        errorMessage={error.password}
        validationState={error.password ? 'invalid' : undefined}
      />
      <Button
        className={styles.submitBtn}
        view="action"
        width="max"
        pin="brick-brick"
        size="xl"
        type="submit"
        disabled={!touched || !isValid}>
        Войти
      </Button>
    </div>
  )
}
