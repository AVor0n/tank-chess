import { ThemeProvider } from '@gravity-ui/uikit'
import React from 'react'
import { RouterProvider } from 'react-router-dom'
import withAuthInfo from 'hoc/withAuthInfo'
import router from './router'

const App = () => (
  <React.StrictMode>
    <ThemeProvider theme="light">
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
)

export default withAuthInfo(App)
