import { Button, TextInput } from '@gravity-ui/uikit'
import styles from '@pages/profilePage/profilePage.module.scss'

interface FormProps {
  state: Record<string, string>
  error: Record<string, string>
  isValid: boolean
  touched: boolean
}

export const FormPassword = ({ state, error, isValid, touched }: FormProps) => (
  <div className={styles.password}>
    <h3 className={styles.title}>Поменять пароль</h3>
    <div>
      <TextInput
        name="oldPassword"
        placeholder="Текущий пароль"
        type="password"
        view="normal"
        pin="round-round"
        value={state.oldPassword}
        errorMessage={error.oldPassword}
        validationState={error.oldPassword ? 'invalid' : undefined}
      />
    </div>
    <div>
      <TextInput
        name="newPassword"
        view="normal"
        placeholder="Новый пароль"
        type="password"
        pin="round-round"
        value={state.newPassword}
        errorMessage={error.newPassword}
        validationState={error.newPassword ? 'invalid' : undefined}
      />
    </div>
    <Button view="action" size="l" type="submit" disabled={!touched || !isValid}>
      Сохранить
    </Button>
  </div>
)
