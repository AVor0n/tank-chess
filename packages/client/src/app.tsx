'use client'
import { ThemeProvider, ToasterComponent, ToasterProvider } from '@gravity-ui/uikit'
import { type FC, useEffect } from 'react'
import Error from '@components/error'
import { toggleFullScreen } from '@utils/webApi'
import { api } from 'reducers/api'
import { selectorIsAuth, selectorUserInfo } from 'reducers/auth'
import { useAppDispatch, useAppSelector } from 'reducers/hooks'
import { THEME_LS_KEY, type Theme, setTheme } from 'reducers/theme'
import wsService from './service/socket.service'
import registerServiceWorker from './utils/serviceWorker'

if (process.env.NODE_ENV === 'production') {
  registerServiceWorker()
}

interface Props {
  RouterProvider?: React.ComponentType
}

const App: FC<Props> = ({ RouterProvider }) => {
  const [executeOAuth] = api.useExecuteOAuthMutation()
  const isAuth = useAppSelector(selectorIsAuth)
  const userInfo = useAppSelector(selectorUserInfo)
  const { theme } = useAppSelector(state => state.theme)
  const [getTheme] = api.useLazyGetThemeQuery()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const onPressKey = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'Enter') {
        toggleFullScreen(null)
      }
    }

    document.addEventListener('keyup', onPressKey)

    return () => {
      document.removeEventListener('keyup', onPressKey)
    }
  }, [])

  useEffect(() => {
    const url = new URL(window.location.href)
    const code = url.searchParams.get('code')
    if (code) {
      executeOAuth(code)
    }
  }, [executeOAuth])

  useEffect(() => {
    const themeFromLS = (localStorage.getItem(THEME_LS_KEY) as Theme) ?? 'light'
    dispatch(setTheme(themeFromLS))
  }, [dispatch])

  useEffect(() => {
    const updateTheme = async () => {
      const themeFromApi = (await getTheme().unwrap()) ?? 'light'
      dispatch(setTheme(themeFromApi))
    }

    if (isAuth) {
      updateTheme()
    }
  }, [dispatch, getTheme, isAuth])

  useEffect(() => {
    if (userInfo) {
      wsService.connect(userInfo.id, userInfo.login)
    }

    return () => {
      wsService.socket.close()
    }
  }, [userInfo?.id])

  return (
    <ThemeProvider theme={theme}>
      <ToasterProvider>
        {RouterProvider ? <RouterProvider /> : null}
        <Error />
        <ToasterComponent />
      </ToasterProvider>
    </ThemeProvider>
  )
}

export default App
