import { Loader } from '@gravity-ui/uikit'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Form from '@components/form'
import LeftMenuPage from '@components/leftMenuPage'
import { FormContext } from 'context/formContext'
import { type CommentDto, selectComments } from 'reducers/forum/commentSlice'
import { createNewComment } from 'reducers/forum/commentThunks/createNewComment'
import { selectTopic, selectTopicsLoading } from 'reducers/forum/topicSlice'
import { getTopicById } from 'reducers/forum/topicThunks/getTopicById'
import { useAppDispatch, useAppSelector } from 'reducers/hooks'
import { type Nullable, type EmojiType } from 'types/types'
import EmojiService from '../../service/reaction.service'
import CommentItem from './components/commentItem'
import FormComment from './components/formComment'
import styles from './topicPage.module.scss'

export const TopicPage = () => {
  const currentTopic = useAppSelector(selectTopic)
  const currentComments = useAppSelector(selectComments)
  const loading = useAppSelector(selectTopicsLoading)
  const dispatch = useAppDispatch()
  const { topicId } = useParams()

  const [emoji, setEmoji] = useState<Nullable<EmojiType[]>>(() => [])
  useEffect(() => {
    ;(async () => {
      setEmoji(await EmojiService.getEmojiSet())
    })()
  }, [])

  useEffect(() => {
    if (topicId) {
      dispatch(getTopicById(topicId))
    }
  }, [topicId, dispatch])

  const onAddNewPost = (data: Record<string, File | string | number>) => {
    const { text } = data
    if (currentTopic && text) {
      dispatch(createNewComment({ text, topicId: currentTopic?.id } as CommentDto))
    }
  }

  if (loading) return <Loader />

  return (
    <LeftMenuPage>
      <section className={styles.container}>
        <div>
          <h1 className={styles.title}>{currentTopic?.title}</h1>
          <h3 className={styles.title}>{currentTopic?.text}</h3>
          {currentComments.map(comment => (
            <CommentItem key={comment.id} comment={comment} emoji={emoji} />
          ))}
        </div>
        <Form onSubmit={onAddNewPost}>
          <FormContext.Consumer>{state => <FormComment {...state} emoji={emoji} />}</FormContext.Consumer>
        </Form>
      </section>
    </LeftMenuPage>
  )
}
