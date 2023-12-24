import { Tabs } from '@gravity-ui/uikit'
import { useState, useContext, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Form from '@components/form'
import Container from '../../components/container'
import AuthContext from '../../context/authContext'
import { FormContext } from '../../context/formContext'
import AuthService from '../../service/auth.service'
import { type LocationState, type signUpDataType, type signInDataType } from '../../types/types'
import SignIn from './components/signIn'
import SignUp from './components/signUp'

export const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('signin')
  /**
   * если пользователь авторизован, то на эту страницу не зайти
   */

  const { isAuth, setAuth } = useContext(AuthContext)
  const location = useLocation()
  const navigate = useNavigate()
  const prevAddress = (location?.state as LocationState)?.location?.pathname
  const from: string = prevAddress ? prevAddress : '/'

  useEffect(() => {
    if (isAuth) navigate(from, { replace: true }) //
  })

  const submitLogin = (data: Record<string, string | File>) => {
    AuthService.signIn(data as unknown as signInDataType, () => {
      setAuth(true)
      navigate(from, { replace: true })
    })
  }

  const submitReg = (data: Record<string, string | File>) => {
    AuthService.signUp(data as unknown as signUpDataType, () => {
      setAuth(true)
      navigate(from, { replace: true })
    })
  }

  return (
    <Container>
      <Tabs activeTab={activeTab} size="xl">
        <Tabs.Item key="signin" id="signin" title="Авторизация" onClick={() => setActiveTab('signin')} />
        <Tabs.Item key="signup" id="signup" title="Регистрация" onClick={() => setActiveTab('signup')} />
      </Tabs>
      {activeTab === 'signin' ? (
        <Form onSubmit={submitLogin}>
          <FormContext.Consumer>{state => <SignIn {...state} />}</FormContext.Consumer>
        </Form>
      ) : (
        <Form onSubmit={submitReg}>
          <FormContext.Consumer>{state => <SignUp {...state} />}</FormContext.Consumer>
        </Form>
      )}
    </Container>
  )
}
