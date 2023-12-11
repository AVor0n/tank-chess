import React, { ReactNode, useState } from 'react'
import { Tabs, Link } from '@gravity-ui/uikit'
import Container from '../../components/container'
import Form from '../../components/form'

const formList: Record<string, any> = {
  auth: {
    id: 'auth',
    title: 'Авторизация',
    items: [
      { name: 'login', placeholder: 'Логин' },
      { name: 'password', placeholder: 'Пароль', type: 'password' },
    ],
    btn: {
      label: 'Войти',
      submit_func: () => {
        alert('auth')
      },
    },
  },
  reg: {
    id: 'reg',
    title: 'Регистрация',
    items: [
      { name: 'first_name', placeholder: 'Имя' },
      { name: 'second_name', placeholder: 'Фамилия' },
      { name: 'login', placeholder: 'Логин' },
      { name: 'email', placeholder: 'E-mail' },
      { name: 'phone', placeholder: 'Телефон' },
      { name: 'password', placeholder: 'Пароль', type: 'password' },
      {
        name: 'password_confirm',
        placeholder: 'Повторите пароль',
        type: 'password',
      },
    ],
    btn: {
      label: 'Зарегистрироваться',
      submit_func: () => {
        alert('reg')
      },
    },
  },
}

export const AuthPage = function () {
  const [activeTab, setActiveTab] = useState(formList.auth.id)

  const tabsList = Object.values(formList).map(form => {
    return (
      <Tabs.Item
        key={form.id}
        id={form.id}
        title={form.title}
        onClick={() => setActiveTab(form.id)}
      />
    )
  })

  const additionalNodes: Array<ReactNode> = []
  if (activeTab === formList.auth.id) {
    additionalNodes.push(
      <p key="add_1">
        Впервые здесь?{' '}
        <Link onClick={() => setActiveTab(formList.reg.id)}>
          Зарегистрируйтесь
        </Link>
      </p>
    )
    additionalNodes.push(
      <p key="add_2">
        <Link href="/email">Забыли пароль</Link>
      </p>
    )
  } else if (activeTab === formList.reg.id)
    additionalNodes.push(
      <Link key="add_1" onClick={() => setActiveTab(formList.auth.id)}>
        Авторизация
      </Link>
    )

  return (
    <Container>
      <Tabs activeTab={activeTab} size="xl">
        {tabsList}
      </Tabs>
      <Form
        items={formList[activeTab].items}
        btn={{
          label: formList[activeTab].btn.label,
          submit_func: formList[activeTab].btn.submit_func,
        }}
        additional_nodes={additionalNodes}
      />
    </Container>
  )
}
