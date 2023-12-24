import { Button } from '@gravity-ui/uikit'
import { useState } from 'react'
import FormInput from '@components/formInput'
import { type FormProps } from '../../../../types/types'
import styles from './signUp.module.scss'

export const SignUp = ({ state, error, isValid, touched }: FormProps) => {
  const [signUpData, setSignUpData] = useState({
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    phone: '',
    password: '',
  })

  return (
    <div className={styles.form}>
      <FormInput
        placeholder="Имя"
        name="first_name"
        onChange={(first_name: string) => setSignUpData({ ...signUpData, first_name })}
        value={state.first_name}
        errorMessage={error.first_name}
        validationState={error.first_name ? 'invalid' : undefined}
      />
      <FormInput
        placeholder="Фамилия"
        name="second_name"
        onChange={(second_name: string) => setSignUpData({ ...signUpData, second_name })}
        value={state.second_name}
        errorMessage={error.second_name}
        validationState={error.second_name ? 'invalid' : undefined}
      />
      <FormInput
        placeholder="Логин"
        name="login"
        onChange={(login: string) => setSignUpData({ ...signUpData, login })}
        value={state.login}
        errorMessage={error.login}
        validationState={error.login ? 'invalid' : undefined}
      />
      <FormInput
        placeholder="E-mail"
        name="email"
        onChange={(email: string) => setSignUpData({ ...signUpData, email })}
        value={state.email}
        errorMessage={error.email}
        validationState={error.email ? 'invalid' : undefined}
      />
      <FormInput
        placeholder="Телефон"
        name="phone"
        onChange={(phone: string) => setSignUpData({ ...signUpData, phone })}
        value={state.phone}
        errorMessage={error.phone}
        validationState={error.phone ? 'invalid' : undefined}
      />
      <FormInput
        placeholder="Пароль"
        name="password"
        type="password"
        onChange={(password: string) => setSignUpData({ ...signUpData, password })}
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
        Зарегистрироваться
      </Button>
    </div>
  )
}
