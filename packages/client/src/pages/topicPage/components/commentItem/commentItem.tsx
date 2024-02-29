import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AddReaction from '@components/addReaction'
import { formatDate } from '@utils/format'
import { selectorUserInfo } from 'reducers/auth'
import { type CommentDto } from 'reducers/forum/commentSlice'
import { deleteComment } from 'reducers/forum/commentThunks/deleteComment'
import { useAppDispatch, useAppSelector } from 'reducers/hooks'
import { type ReactionType, type EmojiType, type Nullable } from 'types/types'
import ReactionService from '../../../../service/reaction.service'
import trashImg from './images/trash.svg'
import styles from './commentItem.module.scss'

interface CommentProps {
  comment: CommentDto
  emoji: Nullable<EmojiType[]>
}

export const CommentItem = ({ comment, emoji }: CommentProps) => {
  const [reactionList, setReactionList] = useState<ReactionType[]>([])
  const commentTime = formatDate(comment.createdAt)
  const dispatch = useAppDispatch()
  const { topicId } = useParams()
  const user = useAppSelector(selectorUserInfo)
  useEffect(() => {
    ;(async () => {
      const reactionsOnComment: ReactionType[] = await ReactionService.getReactionsOnComment(Number(comment.id))
      setReactionList(reactionsOnComment)
    })()
  }, [])

  const handleDeleteComment = () => {
    if (topicId) {
      dispatch(deleteComment({ topicId, commentId: comment.id }))
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.messageContainer}>
        <div className={styles.text}>
          <p className={styles.message}>{comment.text}</p>
        </div>
        <div className={styles.info}>
          <div>
            <p className={styles.author}>Автор - User</p>
            <p className={styles.time}>Оставлен - {commentTime}</p>
          </div>
          <div className={styles.delete}>
            <img className={styles.trash} src={trashImg} alt="Удалить" onClick={handleDeleteComment} />
          </div>
        </div>
      </div>

      {emoji && user?.id && (
        <AddReaction
          commentId={Number(comment.id)}
          reactions={reactionList}
          emojiSet={emoji}
          userId={user?.id}
          onAddRection={() => {
            ;(async () => {
              const reactionsOnComment = await ReactionService.getReactionsOnComment(Number(comment.id))
              setReactionList(reactionsOnComment)
            })()
          }}
        />
      )}
    </div>
  )
}
