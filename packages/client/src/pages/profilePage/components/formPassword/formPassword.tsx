import { Button } from '@gravity-ui/uikit'
import FormInput from '@components/formInput'
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
      <FormInput
        name="oldPassword"
        placeholder="Текущий пароль"
        type="password"
        view="normal"
        value={state.oldPassword}
        errorMessage={error.oldPassword}
        validationState={error.oldPassword ? 'invalid' : undefined}
      />

      <FormInput
        name="newPassword"
        view="normal"
        placeholder="Новый пароль"
        type="password"
        value={state.newPassword}
        errorMessage={error.newPassword}
        validationState={error.newPassword ? 'invalid' : undefined}
      />
    </div>

    <Button
      className={styles.submitBtn}
      view="action"
      width="max"
      size="xl"
      pin="brick-brick"
      type="submit"
      disabled={!touched || !isValid}>
      Сохранить
    </Button>
  </div>
)
