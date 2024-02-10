import { type EmojiType, type Nullable } from '../../types/types'
import styles from './emojiBar.module.scss'

interface EmojiBarProps {
  emojiSet: Nullable<EmojiType[]>
  isVisible: boolean
  onChooseEmoji: (emoji: EmojiType) => void
}

export const EmojiBar = ({ emojiSet, isVisible, onChooseEmoji }: EmojiBarProps) => (
  <div className={styles.emojiBarPopupContainer}>
    <div className={isVisible ? styles.emojiBarPopupVisible : styles.emojiBarPopupHidden}>
      {emojiSet?.map(emoji => (
        <div key={emoji.id} className={styles.emojiItem} onClick={() => onChooseEmoji(emoji)}>
          {emoji.code}
        </div>
      ))}
    </div>
  </div>
)
