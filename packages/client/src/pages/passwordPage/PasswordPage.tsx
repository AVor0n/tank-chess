import { ReactNode } from 'react'
import { Link } from '@gravity-ui/uikit'
import Container from '../../components/container'
import Form from '../../components/form'

const formFields: Record<string, any> = {
  id: 'password',
  h2_title: 'Восстановление пароля',
  items: [
    { name: 'password', placeholder: 'Новый пароль', type: 'password' },
    {
      name: 'password_confirm',
      placeholder: 'Повторите пароль',
      type: 'password',
    },
  ],
  btn: {
    label: 'Изменить пароль',
    submit_func: () => {
      alert('password')
    },
  },
}

export const PasswordPage = function () {
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
        h2_title={formFields.h2_title}
      />
    </Container>
  )
}
