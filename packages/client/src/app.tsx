import { ToasterComponent, ToasterProvider, ThemeProvider } from '@gravity-ui/uikit'
import React, { useState, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import PageLoader from './components/pageLoader'
import AuthContext from './context/authContext'
import router from './router'
import AuthService from './service/auth.service'
import { type RootStateType } from './store'

const App = () => {
  const loading = useSelector((state: RootStateType) => state.user.loading)
  const [isAuth, setAuth] = useState<boolean>(false)
  const authInfo = useMemo(() => ({ isAuth, setAuth }), [isAuth])

  useEffect(() => {
    const fetchUser = async () => {
      const user = await AuthService.getUser()
      if (user && user.id > 0) setAuth(true)
    }
    fetchUser()
  }, [])

  return (
    <>
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
    </>
  )
}

export default App
