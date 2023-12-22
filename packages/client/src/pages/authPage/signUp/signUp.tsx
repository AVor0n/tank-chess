import { Link, Button } from '@gravity-ui/uikit'
import { type FC, useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import FormInput from '../../../components/formInput'
import AuthContext from '../../../context/authContext'
import AuthService from '../../../service/auth.service'
import { type signUpDataType, type LocationState } from '../../../types/types'
import styles from './signUp.module.scss'

interface SignUpProps {
  backSignIn?: () => void
}

export const SignUp: FC<SignUpProps> = ({ backSignIn }) => {
  const [signUpData, setSignUpData] = useState({
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    phone: '',
    password: '',
  })
  const { setAuth } = useContext(AuthContext)
  const location = useLocation()
  const navigate = useNavigate()
  const prevAddress = (location?.state as LocationState)?.location?.pathname
  const from: string = prevAddress ? prevAddress : '/'

  const submit = (data: signUpDataType, changeAuth: (statement: boolean) => void) => {
    AuthService.signUp(data, () => {
      changeAuth(true)
      navigate(from, { replace: true })
    })
  }
  return (
    <form className={styles.form}>
      <FormInput
        placeholder="Имя"
        name="first_name"
        onChange={(first_name: string) => setSignUpData({ ...signUpData, first_name })}
      />
      <FormInput
        placeholder="Фамилия"
        name="second_name"
        onChange={(second_name: string) => setSignUpData({ ...signUpData, second_name })}
      />
      <FormInput
        placeholder="Логин"
        name="login"
        onChange={(login: string) => setSignUpData({ ...signUpData, login })}
      />
      <FormInput
        placeholder="E-mail"
        name="email"
        onChange={(email: string) => setSignUpData({ ...signUpData, email })}
      />
      <FormInput
        placeholder="Телефон"
        name="password"
        onChange={(phone: string) => setSignUpData({ ...signUpData, phone })}
      />
      <FormInput
        placeholder="Пароль"
        name="password"
        type="password"
        onChange={(password: string) => setSignUpData({ ...signUpData, password })}
      />

      <Button
        className={styles.submitBtn}
        view="action"
        width="max"
        pin="brick-brick"
        size="xl"
        onClick={() => {
          submit(signUpData, setAuth)
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
