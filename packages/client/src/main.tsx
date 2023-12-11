import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { ThemeProvider } from '@gravity-ui/uikit'
import App from './App'
import './assets/styles/index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme="light">
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
)
