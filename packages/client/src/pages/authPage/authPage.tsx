import { Tabs } from '@gravity-ui/uikit'
import { useState, useContext, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Container from '../../components/container'
import AuthContext from '../../context/authContext'
import { type LocationState } from '../../types/types'
import SignIn from './signIn'
import SignUp from './signUp'

export const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('signin')
  /**
   * если пользователь авторизован, то на эту страницу не зайти
   */

  const { isAuth } = useContext(AuthContext)
  const location = useLocation()
  const navigate = useNavigate()
  const prevAddress = (location?.state as LocationState)?.location?.pathname
  const from: string = prevAddress ? prevAddress : '/'

  useEffect(() => {
    if (isAuth) navigate(from, { replace: true })
  })

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
