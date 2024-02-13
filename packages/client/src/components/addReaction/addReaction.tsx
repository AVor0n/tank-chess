import { useState } from 'react'
import EmojiBar from '@components/emojiBar'
import ReactionService from 'service/reaction.service'
import { type Nullable, type ReactionType, type EmojiType } from 'types/types'
import styles from './addReaction.module.scss'
/* eslint @typescript-eslint/no-misused-promises: 0 */

interface AddReactionProps {
  emojiSet: Nullable<EmojiType[]>
  reactions?: Nullable<ReactionType[]>
  commentId: number
  onAddRection: () => void
}
export const AddReaction = ({ reactions, emojiSet, commentId, onAddRection }: AddReactionProps) => {
  const [isEmojiVisible, setEmojiVisibility] = useState(false)

  return (
    <div className={styles.reactionActsContainer}>
      <div className={styles.reactionList}>
        {reactions?.map(reaction => (
          <div
            key={reaction.emojiId}
            className={styles.reactionContainer}
            onClick={() => {
              ;(async () => {
                await ReactionService.addReactionsOnComment(commentId, reaction.emojiId)
                onAddRection()
              })()
            }}>
            <div className={styles.emoji}>{reaction.code}</div>
            <div className={styles.quantity}>{reaction.quantity}</div>
          </div>
        ))}
      </div>

      <div
        className={styles.reactionAddContainer}
        onMouseLeave={() => {
          setEmojiVisibility(false)
        }}>
        <EmojiBar
          emojiSet={emojiSet}
          isVisible={isEmojiVisible}
          onChooseEmoji={emoji =>
            (async () => {
              await ReactionService.addReactionsOnComment(commentId, emoji.id)
              onAddRection()
            })()
          }
        />
        <div
          className={styles.emojiAddBtn}
          onMouseOver={() => {
            setEmojiVisibility(true)
          }}
        />
      </div>
    </div>
  )
}
