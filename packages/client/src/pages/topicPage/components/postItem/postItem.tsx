import { useEffect, useState } from 'react'
import AddReaction from '@components/addReaction'
import { type ReactionType, type EmojiType, type Nullable, type PostDto } from 'types/types'
import ReactionService from '../../../../service/reaction.service'
import styles from './postItem.module.scss'

interface PostProps {
  post: PostDto
  emoji: Nullable<EmojiType[]>
}

export const PostItem = ({ post, emoji }: PostProps) => {
  const [reactionList, setReactionList] = useState<ReactionType[]>([])
  useEffect(() => {
    ;(async () => {
      const reactionsOnComment: ReactionType[] = await ReactionService.getReactionsOnComment(Number(post.id))
      setReactionList(reactionsOnComment)
    })()
  }, [])
  return (
    <div className={styles.container}>
      <div className={styles.messageContainer}>
        <div className={styles.text}>
          <h6 className={styles.title}>{post.title}</h6>
          <p className={styles.message}>{post.text}</p>
        </div>
        <div className={styles.info}>
          <p>Автор - {post.user?.login}</p>
          <p>Оставлен - {post.time}</p>
        </div>
      </div>

      {emoji && (
        <AddReaction
          commentId={Number(post.id)}
          reactions={reactionList}
          emojiSet={emoji}
          onAddRection={() => {
            ;(async () => {
              const reactionsOnComment = await ReactionService.getReactionsOnComment(Number(post.id))
              setReactionList(reactionsOnComment)
            })()
          }}
        />
      )}
    </div>
  )
}
