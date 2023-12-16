import { useState } from 'react'
import formValidate from '../utils/validate'

type data = Record<string, File | string>
type validate = (data: data) => boolean

export const useFormValidate = (): [data, boolean, validate] => {
  const [state, setState] = useState({
    isValid: false,
    error: {},
  })

  const validate: validate = (data: data) => {
    const error = formValidate(data)
    const isValid = Object.keys(error).length === 0
    setState({ ...state, error, isValid })

    return isValid
  }

  return [state.error, state.isValid, validate]
}
