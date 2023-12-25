import { useNavigate } from 'react-router-dom'
import Form from '@components/form'
import { TOPICS } from '@pages/forumPage/forumPage'
import { FormContext } from 'context/formContext'
import FormTopic from './components/formTopic'

export const NewTopicPage = () => {
  const navigate = useNavigate()

  const onAddNewTopic = (data: Record<string, File | string | number>) => {
    const newId = TOPICS.length
    //@ts-expect-error как будет реализован store нужно переделать
    TOPICS.push({ ...data, id: String(newId + 1) })
    navigate('/forum')
  }

  return (
    <section>
      <Form onSubmit={onAddNewTopic}>
        <FormContext.Consumer>{state => <FormTopic {...state} />}</FormContext.Consumer>
      </Form>
    </section>
  )
}
