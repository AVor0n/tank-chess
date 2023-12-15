import React, { FC, ComponentProps, useState } from 'react'
import styles from './FormInput.module.scss'
import { TextInput } from '@gravity-ui/uikit'

interface InputProps
  extends Omit<ComponentProps<typeof TextInput>, 'onChange'> {
  onChange?: (currentValue: string) => void
}

export const FormInput: FC<InputProps> = ({
  size = 'xl',
  placeholder = '',
  pin = 'brick-brick',
  type = 'text',
  onChange,
  name,
  ...props
}) => {
  const [value, setValue] = useState('')

  const changeHandler = (val: string) => {
    onChange && onChange(val)
    setValue(val)
  }

  return (
    <div key={'div_inp_' + name} className={styles.inputContainer}>
      <TextInput
        value={value}
        size={size}
        placeholder={placeholder}
        pin={pin}
        type={type}
        name={name}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          changeHandler(event.target.value)
        }
        {...props}
      />
    </div>
  )
}
