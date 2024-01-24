import { useNavigate } from 'react-router-dom'
import Form from '@components/form'
import LeftMenuPage from '@components/leftMenuPage'
import { TOPICS } from '@pages/forumPage/forumPage'
import { FormContext } from 'context/formContext'
import FormTopic from './components/formTopic'
import styles from './newTopicPage.module.scss'

export const NewTopicPage = () => {
  const navigate = useNavigate()

  const onAddNewTopic = (data: Record<string, File | string | number>) => {
    const newId = TOPICS.length
    //@ts-expect-error как будет реализован store нужно переделать
    TOPICS.push({ ...data, id: String(newId + 1) })
    navigate('/forum')
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
