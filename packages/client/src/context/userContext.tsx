// Контекст активного пользователя
import React from 'react'
import { User } from '../types/types'

const userDefault: User = {
  id: null,
  phone: null,
  second_name: null,
  login: null,
  first_name: null,
  email: null,
}
export const UserContext = React.createContext(userDefault)
