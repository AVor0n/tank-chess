import { Button, TextArea, TextInput } from '@gravity-ui/uikit'
import styles from './formTopic.module.scss'

interface FormProps {
  state: Record<string, string>
  error: Record<string, string>
  isValid: boolean
  touched: boolean
}

export const FormTopic = ({ state, error, isValid, touched }: FormProps) => (
  <div className={styles.container}>
    <div className={styles.text}>
      <TextInput
        name="title"
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
    <div className={styles.text}>
      <TextArea
        name="text"
        placeholder="Текст топика"
        minRows={6}
        view="normal"
        pin="round-round"
        value={state.text}
        errorMessage={error.text}
        validationState={error.text ? 'invalid' : undefined}
      />
    </div>
    <Button view="action" size="l" type="submit" disabled={!touched || !isValid}>
      Сохранить
    </Button>
  </div>
)
