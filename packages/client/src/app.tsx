import { ToasterComponent, ToasterProvider, ThemeProvider } from '@gravity-ui/uikit'
import React, { useState, useEffect, useMemo } from 'react'
import { RouterProvider } from 'react-router-dom'
import PageLoader from './components/pageLoader'
import AuthContext from './context/authContext'
import { UserContext } from './context/userContext'
import router from './router'
import AuthService from './service/auth.service'
import { type User } from './types/types'

// Мок без авторизации
const user: User = {
  id: 423,
  first_name: 'Petya',
  second_name: 'Pupkin',
  phone: '+79001001100',
  login: 'userLogin',
  email: 'string@ya.ru',
}

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

  return loading ? (
    <PageLoader />
  ) : (
    <React.StrictMode>
      <ThemeProvider theme="light">
        <AuthContext.Provider value={authInfo}>
          <UserContext.Provider value={user}>
            <ToasterProvider>
              <RouterProvider router={router} />
              <ToasterComponent className="optional additional classes" />
            </ToasterProvider>
          </UserContext.Provider>
        </AuthContext.Provider>
      </ThemeProvider>
    </React.StrictMode>
  )
}

export default App
