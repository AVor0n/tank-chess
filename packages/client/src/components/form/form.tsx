import { useState, useMemo, type PropsWithChildren, type FormEvent } from 'react'
import { FormContext } from '../../context/formContext'
import { useFormValidate } from '../../hook/useFormValidate'

interface FormProps<T> extends PropsWithChildren {
  onSubmit?: (data: T) => void
}

/**
 * Компонент форм с общей валидацией
 * @param children - JSX с любыми инпутами
 * @param onSubmit - событие отправки формы
 */
export const Form = <T,>({ children, onSubmit }: FormProps<T>) => {
  const [state, setState] = useState({})
  const [touched, setTouched] = useState(false)
  const [error, isValid, validate] = useFormValidate()

  const onSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)
    const isValidate = validate(data)
    if (isValidate && onSubmit) {
      onSubmit(data as T)
    }
    setState(data)
  }

  const onBlur = () => {
    validate(state)
  }

  const onChange = (event: FormEvent<HTMLFormElement>) => {
    const target = event.target as HTMLFormElement
    const { name, value } = target
    setState({ ...state, [name]: value as string })
    setTouched(true)
  }

  return (
    <form action="#" onSubmit={onSubmitForm} onChange={onChange} onBlur={onBlur}>
      <FormContext.Provider
        value={useMemo(() => ({ state, isValid, error, touched }), [state, isValid, error, touched])}>
        {children}
      </FormContext.Provider>
    </form>
  )
}
