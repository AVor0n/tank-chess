import { useEffect, useState } from 'react'
import Form from '@components/form'
import LeftMenuPage from '@components/leftMenuPage'
import { TOPICS } from '@pages/forumPage/forumPage'
import { FormContext } from 'context/formContext'
import ForumService from 'service/forum-test.service'
import { type Nullable, type EmojiType, type PostDto } from 'types/types'
import EmojiService from '../../service/reaction.service'
import FormPost from './components/formPost'
import PostItem from './components/postItem'
import styles from './topicPage.module.scss'

interface TopicProps {
  topicId: string
}

export const TopicPage = ({ topicId }: TopicProps) => {
  const [posts, setPosts] = useState<PostDto[]>([])
  const [topicTitle] = useState(TOPICS.find(topic => topic.id === topicId)?.theme)

  const [emoji, setEmoji] = useState<Nullable<EmojiType[]>>(null)
  useEffect(() => {
    ;(async () => {
      setEmoji(await EmojiService.getEmojiSet())
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      const posts: PostDto[] = await ForumService.getComments(Number(topicId))
      setPosts(posts)
    })()
  }, [topicId])

  const onAddNewPost = (data: Record<string, File | string | number>) => {
    // eslint-disable-next-line no-console
    console.log(data)
  }

  return (
    <LeftMenuPage>
      <section className={styles.container}>
        <div>
          <h1 className={styles.title}>{topicTitle}</h1>
          {posts.map(post => {
            /*временные данные*/
            post.user = {
              id: 1,
              phone: '1122121212',
              second_name: 'Тест',
              login: 'test',
              first_name: 'Тест',
              email: 'Тест',
            }
            return <PostItem key={post.id} post={post} emoji={emoji} />
          })}
        </div>
        <Form onSubmit={onAddNewPost}>
          <FormContext.Consumer>{state => <FormPost {...state} emoji={emoji} />}</FormContext.Consumer>
        </Form>
      </section>
    </LeftMenuPage>
  )
}
