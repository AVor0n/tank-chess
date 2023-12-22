import { Button } from '@gravity-ui/uikit'
import { type FC, useContext, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import FormInput from '../../../components/formInput'
import AuthContext from '../../../context/authContext'
import AuthService from '../../../service/auth.service'
import { type signInDataType, type LocationState } from '../../../types/types'
import styles from './signIn.module.scss'

export const SignIn: FC = () => {
  const [signInData, setSignInData] = useState({
    login: '',
    password: '',
  })

  const { setAuth } = useContext(AuthContext)
  const location = useLocation()
  const navigate = useNavigate()
  const prevAddress = (location?.state as LocationState)?.location?.pathname
  const from: string = prevAddress ? prevAddress : '/'

  const submit = (data: signInDataType, changeAuth: (statement: boolean) => void) => {
    AuthService.signIn(data, () => {
      changeAuth(true)
      navigate(from, { replace: true })
    })
  }
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
        onClick={() => {
          submit(signInData, setAuth)
        }}>
        Войти
      </Button>
      <div
        onClick={() => {
          AuthService.logout()
        }}>
        выйти
      </div>
    </form>
  )
}
