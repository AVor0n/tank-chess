import { Button, TextArea, TextInput } from '@gravity-ui/uikit'
import { useState } from 'react'
import EmojiBar from '@components/emojiBar'
import { type EmojiType, type Nullable } from 'types/types'
import styles from './formPost.module.scss'

interface FormProps {
  state: Record<string, string>
  error: Record<string, string>
  isValid: boolean
  touched: boolean
  emoji: Nullable<EmojiType[]>
}

export const FormPost = ({ state, error, isValid, touched, emoji }: FormProps) => {
  const [textAreaContent, setTextAreaContent] = useState(state.text)
  const [isEmojiVisible, setEmojiVisibility] = useState(false)

  return (
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
          value={textAreaContent}
          errorMessage={error.text}
          validationState={error.text ? 'invalid' : undefined}
          onKeyUp={() => setTextAreaContent(state.text)}
        />
      </div>
      <div className={styles.footerForm}>
        <Button view="action" size="l" type="submit" disabled={!touched || !isValid}>
          Добавить
        </Button>
        {emoji?.length && (
          <div
            className={styles.footerLeft}
            onMouseLeave={() => {
              setEmojiVisibility(false)
            }}>
            <EmojiBar
              emojiSet={emoji}
              isVisible={isEmojiVisible}
              onChooseEmoji={emoji => {
                if (!state.text) state.text = ''
                state.text += emoji.code
                setTextAreaContent(state.text)
              }}
            />
            <div
              onMouseOver={() => {
                setEmojiVisibility(true)
              }}
              className={isEmojiVisible ? styles.emojiBtnVisible : styles.emojiBtnHidden}
            />
          </div>
        )}
      </div>
    </div>
  )
}
