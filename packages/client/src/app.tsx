'use client'
import { ThemeProvider } from '@gravity-ui/uikit'
import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import Error from '@components/error'
import { toggleFullScreen } from '@utils/webApi'
import withAuthInfo from 'hoc/withAuthInfo'
import router from './router'
import registerServiceWorker from './utils/serviceWorker'

if (process.env.NODE_ENV === 'production') {
  registerServiceWorker()
}

const App = () => {
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
      <RouterProvider router={router} />
      <Error />
    </ThemeProvider>
  )
}


export default withAuthInfo(App)
