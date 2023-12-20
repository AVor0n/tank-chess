// Контекст формы
import React from 'react'

export const FormContext = React.createContext({
  state: {},
  error: {},
  isValid: false,
  touched: false,
})
