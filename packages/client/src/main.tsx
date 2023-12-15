import { ThemeProvider } from '@gravity-ui/uikit'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import '@gravity-ui/uikit/styles/styles.css'
import { ThemeProvider } from '@gravity-ui/uikit'
import './assets/styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme="light">
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
