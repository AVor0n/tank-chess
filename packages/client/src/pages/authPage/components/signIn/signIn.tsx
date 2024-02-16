import { Button } from '@gravity-ui/uikit'
import { useState } from 'react'
import FormInput from '@components/formInput'
import { api } from 'reducers/api'
import { type FormProps } from '../../../../types/types'
import { redirectToOAuthPage } from '../../utils'
import styles from './signIn.module.scss'

export const SignIn = ({ state, error }: FormProps) => {
  const [getClientId] = api.useLazyGetClientIdQuery()
  const [signInData, setSignInData] = useState({
    login: '',
    password: '',
  })

  const onClickOAuth = () => {
    getClientId()
      .unwrap()
      .then(clientId => {
        redirectToOAuthPage(clientId)
      })
  }

  return (
    <div className={styles.form} data-test="signin">
      <FormInput
        placeholder="Логин"
        name="login"
        onChange={login => setSignInData({ ...signInData, login })}
        value={state.login}
        errorMessage={error.login}
        validationState={error.login ? 'invalid' : undefined}
      />
      <FormInput
        placeholder="Пароль"
        name="password"
        type="password"
        onChange={password => setSignInData({ ...signInData, password })}
        value={state.password}
        errorMessage={error.password}
        validationState={error.password ? 'invalid' : undefined}
      />
      <Button className={styles.submitBtn} view="action" width="max" pin="brick-brick" size="xl" type="submit">
        Войти
      </Button>

      <Button
        className={styles.oAuthBtn}
        onClick={onClickOAuth}
        view="outlined"
        width="max"
        pin="brick-brick"
        size="xl">
        Войти через Яндекс
      </Button>
    </div>
  )
}
