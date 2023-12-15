import React, { ReactNode, useState } from 'react'
import { Tabs, Link } from '@gravity-ui/uikit'
import Container from '../../components/Container'
import SignIn from './SignIn'
import SignUp from './SignUp'

export const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('signin')

  return (
    <Container>
      <Tabs activeTab={activeTab} size="xl">
        <Tabs.Item
          key="signin"
          id="signin"
          title="Авторизация"
          onClick={() => setActiveTab('signin')}
        />
        <Tabs.Item
          key="signup"
          id="signup"
          title="Регистрация"
          onClick={() => setActiveTab('signup')}
        />
      </Tabs>
      {activeTab === 'signin' ? (
        <SignIn />
      ) : (
        <SignUp backSignIn={() => setActiveTab('signin')} />
      )}
    </Container>
  )
}
