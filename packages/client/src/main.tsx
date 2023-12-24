import { ToasterComponent, ToasterProvider, ThemeProvider } from '@gravity-ui/uikit'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { UserContext } from './context/userContext'
import router from './router'
import '@gravity-ui/uikit/styles/styles.css'
import './assets/styles/index.css'
import { type User } from './types/types'

// Мок без авторизации
const user: User = {
  id: '423',
  first_name: 'Petya',
  second_name: 'Pupkin',
  phone: '+79001001100',
  login: 'userLogin',
  email: 'string@ya.ru',
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme="light">
      <UserContext.Provider value={user}>
        <ToasterProvider>
          <RouterProvider router={router} />
          <ToasterComponent className="optional additional classes" />
        </ToasterProvider>
      </UserContext.Provider>
    </ThemeProvider>
  </React.StrictMode>,
)
