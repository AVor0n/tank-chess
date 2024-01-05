import { Button } from '@gravity-ui/uikit'
import { useState } from 'react'
import FormInput from '@components/formInput'
import styles from './formPlayer.module.scss'

interface FormProps {
  state: Record<string, string>
  error: Record<string, string>
  isValid: boolean
  touched: boolean
}

export const FormPlayer = ({ state, error, isValid, touched }: FormProps) => {
  const [signUpData, setSignUpData] = useState({
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    phone: '',
  })

  return (
    <div className={styles.container}>
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
      <Button view="action" width="max" pin="brick-brick" size="xl" type="submit" disabled={!touched || !isValid}>
        Вперед
      </Button>
    </div>
  )
}
