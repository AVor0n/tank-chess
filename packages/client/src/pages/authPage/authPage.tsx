import { Tabs } from '@gravity-ui/uikit'
import { useState, useContext, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Form from '@components/form'
import store from 'store'
import Container from '../../components/container'
import AuthContext from '../../context/authContext'
import { FormContext } from '../../context/formContext'
import { setUserContext } from '../../reducers/user'
import AuthService from '../../service/auth.service'
import { type LocationState, type SignUpDataType, type SignInDataType } from '../../types/types'
import SignIn from './components/signIn'
import SignUp from './components/signUp'
//import {useDispatch} from 'react-redux'

export const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('signin')
  /**
   * если пользователь авторизован, то на эту страницу не зайти
   */

  const { isAuth, setAuth } = useContext(AuthContext)

  /**redirect */
  const location = useLocation()
  const navigate = useNavigate()
  const prevAddress = (location?.state as LocationState)?.location?.pathname
  const from: string = prevAddress ? prevAddress : '/'

  /**redux */
  //const dispatch = useDispatch();
  useEffect(() => {
    if (isAuth) navigate(from, { replace: true }) //
  }, [isAuth, from, navigate])

  const submitLogin = async (data: Record<string, string | File>) => {
    await AuthService.signIn(data as unknown as SignInDataType, () => {
      //setLoading(false) to do!
      try {
        //const user: User | null = await AuthService.getUser();
        //if (user && user?.id > 0) {
        setAuth(true)
        //setLoading(false)
        store.dispatch(setUserContext())
        //console.log('in auth after');
        //console.log(store.getState().user);
        navigate(from, { replace: true })
        //}
      } catch {
        throw new Error('Ошибка!')
      }
    })
  }

  const submitReg = (data: Record<string, string | File>) => {
    AuthService.signUp(data as unknown as SignUpDataType, () => {
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
        <Form onSubmit={() => submitLogin}>
          <FormContext.Consumer>{state => <SignIn {...state} />}</FormContext.Consumer>
        </Form>
      ) : (
        <Form onSubmit={() => submitReg}>
          <FormContext.Consumer>{state => <SignUp {...state} />}</FormContext.Consumer>
        </Form>
      )}
    </Container>
  )
}
