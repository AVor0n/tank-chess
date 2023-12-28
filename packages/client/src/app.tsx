import { ToasterComponent, ToasterProvider, ThemeProvider } from '@gravity-ui/uikit'
import React, { useState, useEffect, useMemo } from 'react'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import PageLoader from './components/pageLoader'
import AuthContext from './context/authContext'
//import { UserContext } from './context/userContext'
import router from './router'
import AuthService from './service/auth.service'
//import { type User } from './types/types'
import store from './store'

// Мок без авторизации
/*const user: User = {
  id: 423,
  first_name: 'Petya',
  second_name: 'Pupkin',
  phone: '+79001001100',
  login: 'userLogin',
  email: 'string@ya.ru',
}*/

const App = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [isAuth, setAuth] = useState<boolean>(false)
  const authInfo = useMemo(() => ({ isAuth, setAuth }), [isAuth])
  useEffect(() => {
    AuthService.getUser()
      .then(user => {
        if (user && user?.id > 0) setAuth(true)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <Provider store={store}>
      {loading ? (
        <PageLoader />
      ) : (
        <React.StrictMode>
          <ThemeProvider theme="light">
            <AuthContext.Provider value={authInfo}>
              <ToasterProvider>
                <RouterProvider router={router} />
                <ToasterComponent className="optional additional classes" />
              </ToasterProvider>
            </AuthContext.Provider>
          </ThemeProvider>
        </React.StrictMode>
      )}
    </Provider>
  )
}

export default App
