import { useState, PropsWithChildren, FormEvent } from 'react'
import { FormContext } from '../../context/formContext'
import { useFormValidate } from '../../hook/useFormValidate'
import { useToaster } from '@gravity-ui/uikit'
import { ToastProps } from '@gravity-ui/uikit/build/esm/components/Toaster/types'

type OwnProps = {
  onSubmit?: (
    data: Record<string, any>,
    toaster: (props: ToastProps) => void
  ) => void
  onChange?: () => void
  children: JSX.Element | JSX.Element[]
}

type FormProps = PropsWithChildren<OwnProps>

/**
 * Компонент форм с общей валидацией
 * @param children - JSX с любыми инпутами
 * @param onSubmit - событие отправки формы
 */
export const Form = ({ children, onSubmit }: FormProps) => {
  const [state, setState] = useState({})
  const [touched, setTouched] = useState(false)
  const [error, isValid, validate] = useFormValidate()

  const { add: toaster } = useToaster()

  const onSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)
    const isValidate = validate(data)
    if (isValidate && onSubmit) {
      onSubmit(data, toaster)
    }
    setState(data)
  }

  const onBlur = () => {
    validate(state)
  }

  const onChange = (event: FormEvent<HTMLFormElement>) => {
    const target = event.target as HTMLFormElement
    const { name, value } = target
    setState({ ...state, [name]: value })
    setTouched(true)
  }

  return (
    <form
      action="#"
      onSubmit={onSubmitForm}
      onChange={onChange}
      onBlur={onBlur}>
      <FormContext.Provider value={{ state, isValid, error, touched }}>
        {children}
      </FormContext.Provider>
    </form>
  )
}
