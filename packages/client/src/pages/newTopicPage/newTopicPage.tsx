import { useNavigate } from 'react-router-dom'
import Form from '@components/form'
import LeftMenuPage from '@components/leftMenuPage'
import { FormContext } from 'context/formContext'
import { createNewTopic } from 'reducers/forum/topicThunks/createNewTopic'
import { useAppDispatch } from 'reducers/hooks'
import FormTopic from './components/formTopic'
import styles from './newTopicPage.module.scss'

export const NewTopicPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onAddNewTopic = (data: Record<string, File | string | number>) => {
    const { title, text } = data as Record<string, string>
    if (title && text) {
      dispatch(createNewTopic({ title, text }))
      navigate('/forum')
    }
  }

  return (
    <LeftMenuPage>
      <div className={styles.newTopicPage}>
        <h1 className={styles.title}>Новая тема</h1>
        <Form onSubmit={onAddNewTopic}>
          <FormContext.Consumer>{state => <FormTopic {...state} />}</FormContext.Consumer>
        </Form>
      </div>
    </LeftMenuPage>
  )
}
