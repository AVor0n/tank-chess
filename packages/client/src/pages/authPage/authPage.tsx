import { Tabs } from '@gravity-ui/uikit'
import { useState } from 'react'
import Container from '../../components/container'
import SignIn from './signIn'
import SignUp from './signUp'

export const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('signin')

  return (
    <Container>
      <Tabs activeTab={activeTab} size="xl">
        <Tabs.Item key="signin" id="signin" title="Авторизация" onClick={() => setActiveTab('signin')} />
        <Tabs.Item key="signup" id="signup" title="Регистрация" onClick={() => setActiveTab('signup')} />
      </Tabs>
      {activeTab === 'signin' ? <SignIn /> : <SignUp backSignIn={() => setActiveTab('signin')} />}
    </Container>
  )
}
