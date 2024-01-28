'use client'
import { ThemeProvider } from '@gravity-ui/uikit'
import { type FC, useEffect } from 'react'
import Error from '@components/error'
import { toggleFullScreen } from '@utils/webApi'
import withAuthInfo from './hoc/withAuthInfo'
import registerServiceWorker from './utils/serviceWorker'

if (process.env.NODE_ENV === 'production') {
  registerServiceWorker()
}

interface Props {
  RouterProvider?: React.ComponentType
}

const App: FC<Props> = ({ RouterProvider }) => {
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

  return (
    <ThemeProvider theme="light">
      {RouterProvider ? <RouterProvider /> : null}
      <Error />
    </ThemeProvider>
  )
}

export default withAuthInfo(App)
