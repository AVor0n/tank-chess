'use client'
import { ThemeProvider, ToasterComponent, ToasterProvider } from '@gravity-ui/uikit'
import { type FC, useEffect } from 'react'
import Error from '@components/error'
import { toggleFullScreen } from '@utils/webApi'
import { api } from 'reducers/api'
import registerServiceWorker from './utils/serviceWorker'

if (process.env.NODE_ENV === 'production') {
  registerServiceWorker()
}

interface Props {
  RouterProvider?: React.ComponentType
}

const App: FC<Props> = ({ RouterProvider }) => {
  const [executeOAuth] = api.useExecuteOAuthMutation()

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

  return (
    <ThemeProvider theme="light">
      <ToasterProvider>
        {RouterProvider ? <RouterProvider /> : null}
        <Error />
        <ToasterComponent />
      </ToasterProvider>
    </ThemeProvider>
  )
}

export default App
