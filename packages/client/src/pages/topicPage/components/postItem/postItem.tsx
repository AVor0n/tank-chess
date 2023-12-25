import { type PostDto } from '@pages/topicPage/topicPage'
import styles from './postItem.module.scss'

interface PostProps {
  post: PostDto
}

export const PostItem = ({ post }: PostProps) => (
  <div className={styles.container}>
    <div className={styles.text}>
      <h6 className={styles.title}>{post.title}</h6>
      <p className={styles.message}>{post.text}</p>
    </div>
    <div className={styles.info}>
      <p>Автор - {post.user.login}</p>
      <p>Оставлен - {post.time}</p>
    </div>
  </div>
)
