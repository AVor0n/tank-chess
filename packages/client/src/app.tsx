import { ThemeProvider } from '@gravity-ui/uikit'
import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { toggleFullScreen } from '@utils/webApi'
import withAuthInfo from 'hoc/withAuthInfo'
import router from './router'

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

const App = () => (
  <React.StrictMode>
    <ThemeProvider theme="light">
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
)

export default withAuthInfo(App)
