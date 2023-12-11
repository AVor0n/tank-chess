import { ReactNode } from 'react'
import { Link } from '@gravity-ui/uikit'
import Container from '../../components/container'
import Form from '../../components/form'

const formFields: Record<string, any> = {
  id: 'password',
  h2_title: 'Восстановление пароля',
  note: 'Введите e-mail, указаннный при регистрации. На него будет отправлена ссылка для изменения пароля',
  items: [{ name: 'email', placeholder: 'E-mail' }],
  btn: {
    label: 'Отправить ссылку',
    submit_func: () => {
      alert('email')
    },
  },
}

export const EmailPage = function () {
  const additionalNodes: Array<ReactNode> = []
  additionalNodes.push(
    <p key="add_1">
      <Link href="/login">Вспомнили пароль?</Link>
    </p>
  )

  return (
    <Container>
      <Form
        items={formFields.items}
        btn={{
          label: formFields.btn.label,
          submit_func: formFields.btn.submit_func,
        }}
        additional_nodes={additionalNodes}
        note={formFields.note}
        h2_title={formFields.h2_title}
      />
    </Container>
  )
}
