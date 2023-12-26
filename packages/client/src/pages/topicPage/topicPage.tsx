import { useEffect, useState } from 'react'
import Form from '@components/form'
import { TOPICS } from '@pages/forumPage/forumPage'
import { FormContext } from 'context/formContext'
import { type User } from 'types/types'
import FormPost from './components/formPost'
import PostItem from './components/postItem'
import styles from './topicPage.module.scss'

interface TopicProps {
  topicId: string
}

export interface PostDto {
  id: string
  topicId: string
  user: User
  title: string
  text: string
  likes: number
  time: string
}

// Моковые данные, по структуре хранения нужно будет продумать при создании бека
const POSTS: PostDto[] = [
  {
    id: '1',
    topicId: '1',
    user: {
      id: 423,
      first_name: 'Petya',
      second_name: 'Pupkin',
      phone: '+79001001100',
      login: 'userLogin',
      email: 'string@ya.ru',
    },
    title: 'Вопрос про начисление очков',
    text: 'Объясните пожалуйста, как начисляются очки при подбитии танков противника?',
    likes: 2,
    time: '3 дня назад',
  },
  {
    id: '2',
    topicId: '1',
    user: {
      id: 423,
      first_name: 'Petya',
      second_name: 'Pupkin',
      phone: '+79001001100',
      login: 'userLogin',
      email: 'string@ya.ru',
    },
    title: 'Вопрос про победы',
    text: 'Объясните пожалуйста, как победить?',
    likes: 2,
    time: '4 дня назад',
  },
]

export const TopicPage = ({ topicId }: TopicProps) => {
  const [posts, setPosts] = useState<PostDto[]>([])
  const [topicTitle] = useState(TOPICS.find(topic => topic.id === topicId)?.theme)

  useEffect(() => {
    setPosts(POSTS.filter(post => post.topicId === topicId))
  }, [topicId])

  const onAddNewPost = (data: Record<string, File | string | number>) => {
    const newPost = {
      ...data,
      topicId,
      user: {
        id: 423,
        first_name: 'Petya',
        second_name: 'Pupkin',
        phone: '+79001001100',
        login: 'userLogin',
        email: 'string@ya.ru',
      },
    }
    //@ts-expect-error как будет реализован store нужно переделать
    POSTS.push(newPost)
    setPosts(POSTS.filter(post => post.topicId === topicId))
  }

  return (
    <section className={styles.container}>
      <div>
        <h6 className={styles.title}>{topicTitle}</h6>
        {posts.map(post => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
      <Form onSubmit={onAddNewPost}>
        <FormContext.Consumer>{state => <FormPost {...state} />}</FormContext.Consumer>
      </Form>
    </section>
  )
}
