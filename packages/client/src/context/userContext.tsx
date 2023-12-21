// Контекст активного пользователя
import React from 'react'
import { type User } from '../types/types'

const userDefault: User = {
  id: '',
  phone: '',
  second_name: '',
  login: '',
  first_name: '',
  email: '',
}
export const UserContext = React.createContext(userDefault)
