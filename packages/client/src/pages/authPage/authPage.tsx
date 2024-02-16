import { Tabs } from '@gravity-ui/uikit'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from '@components/form'
import PageLoader from '@components/pageLoader'
import { useApiErrorToast } from 'hook/useApiErrorToast'
import { api } from 'reducers/api'
import { selectorIsAuth } from 'reducers/auth'
import { useAppSelector } from 'reducers/hooks'
import Container from '../../components/container'
import { FormContext } from '../../context/formContext'
import { type SignUpDataType, type SignInDataType } from '../../types/types'
import SignIn from './components/signIn'
import SignUp from './components/signUp'

export const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('signin')
  const navigate = useNavigate()
  const [onSignIn, { error: sigInError }] = api.useSignInMutation()
  const [onSignUp, { error: signUpError }] = api.useSignUpMutation()
  const { isLoading } = api.useGetUserQuery()
  const isAuth = useAppSelector(selectorIsAuth)
  useApiErrorToast(sigInError ?? signUpError)

  useEffect(() => {
    if (isAuth) navigate('/', { replace: true })
  }, [isAuth, navigate])

  if (isLoading) return <PageLoader />

  return (
    <Container isCard>
      <Tabs activeTab={activeTab} size="xl">
        <Tabs.Item key="signin" id="signin" title="Авторизация" onClick={() => setActiveTab('signin')} />
        <Tabs.Item key="signup" id="signup" title="Регистрация" onClick={() => setActiveTab('signup')} />
      </Tabs>

      {activeTab === 'signin' && (
        <Form<SignInDataType>
          onSubmit={data => {
            onSignIn(data)
          }}>
          <FormContext.Consumer>{state => <SignIn {...state} />}</FormContext.Consumer>
        </Form>
      )}

      {activeTab === 'signup' && (
        <Form<SignUpDataType>
          onSubmit={data => {
            onSignUp(data)
          }}>
          <FormContext.Consumer>{state => <SignUp {...state} />}</FormContext.Consumer>
        </Form>
      )}
    </Container>
  )
}
