import { Button, TextInput } from '@gravity-ui/uikit'
import styles from './formTopic.module.scss'

interface FormProps {
  state: Record<string, string>
  error: Record<string, string>
  isValid: boolean
  touched: boolean
}

export const FormTopic = ({ state, error, isValid, touched }: FormProps) => (
  <div className={styles.container}>
    <h3 className={styles.title}>Новый топик</h3>
    <div className={styles.text}>
      <TextInput
        name="theme"
        placeholder="Название топика"
        type="text"
        size="xl"
        view="normal"
        pin="round-round"
        value={state.theme}
        errorMessage={error.theme}
        validationState={error.theme ? 'invalid' : undefined}
      />
    </div>
    <Button view="action" size="l" type="submit" disabled={!touched || !isValid}>
      Сохранить
    </Button>
  </div>
)
