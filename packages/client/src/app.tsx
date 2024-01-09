'use client'
import { ThemeProvider } from '@gravity-ui/uikit'
import { RouterProvider } from 'react-router-dom'
import Error from '@components/error'
import withAuthInfo from 'hoc/withAuthInfo'
import router from './router'

const App = () => (
  <ThemeProvider theme="light">
    <RouterProvider router={router} />
    <Error />
  </ThemeProvider>
)

export default withAuthInfo(App)
