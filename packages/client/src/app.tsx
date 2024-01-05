import { ToasterComponent, ToasterProvider, ThemeProvider } from '@gravity-ui/uikit'
import React from 'react'
import { RouterProvider } from 'react-router-dom'
import withAuthInfo from 'hoc/withAuthInfo'
import router from './router'

const App = () => (
  <React.StrictMode>
    <ThemeProvider theme="light">
      <ToasterProvider>
        <RouterProvider router={router} />
        <ToasterComponent className="optional additional classes" />
      </ToasterProvider>
    </ThemeProvider>
  </React.StrictMode>
)

export default withAuthInfo(App)
