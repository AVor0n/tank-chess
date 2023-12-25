import { Button, TextArea, TextInput } from '@gravity-ui/uikit'
import styles from './formPost.module.scss'

interface FormProps {
  state: Record<string, string>
  error: Record<string, string>
  isValid: boolean
  touched: boolean
}

export const FormPost = ({ state, error, isValid, touched }: FormProps) => (
  <div className={styles.container}>
    <h6 className={styles.title}>Новый Комментарий</h6>
    <div className={styles.text}>
      <TextInput
        name="title"
        placeholder="Тема"
        type="text"
        view="normal"
        pin="round-round"
        value={state.title}
        errorMessage={error.title}
        validationState={error.title ? 'invalid' : undefined}
      />
    </div>
    <div className={styles.text}>
      <TextArea
        name="text"
        placeholder="Комментарий"
        minRows={6}
        view="normal"
        pin="round-round"
        value={state.text}
        errorMessage={error.text}
        validationState={error.text ? 'invalid' : undefined}
      />
    </div>
    <Button view="action" size="l" type="submit" disabled={!touched || !isValid}>
      Добавить
    </Button>
  </div>
)
