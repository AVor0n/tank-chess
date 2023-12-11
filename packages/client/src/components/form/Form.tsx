import { ReactNode } from 'react'
import styles from './form.module.scss'
import { TextInput, Button } from '@gravity-ui/uikit'

interface FormProps {
  h2_title?: string
  items?: Array<{
    name: string
    placeholder: string
    type?: string
  }>
  btn?: {
    label?: string
    submit_func: () => void
  }
  additional_nodes?: Array<ReactNode>
  note?: string
}

export const Form = (props: FormProps) => {
  const formInputs: Array<ReactNode> = []
  let submitBtn: ReactNode = ''
  let h2Title: ReactNode = ''
  let note: ReactNode = ''
  props.items?.map((item, index) => {
    formInputs.push(
      <div key={'inp_' + index} className={styles.inputContainer}>
        <TextInput
          size="xl"
          placeholder={item.placeholder}
          pin="brick-brick"
          type={item.type ? item.type : 'text'}
        />
      </div>
    )
  })
  if (props.items?.length) {
    submitBtn = (
      <Button
        className={styles.submitBtn}
        view="action"
        width="max"
        pin="brick-brick"
        size="xl"
        onClick={() => props.btn?.submit_func()}>
        {props.btn?.label ? props.btn?.label : 'Отправить'}
      </Button>
    )
  }

  if (props.h2_title) h2Title = <h2>{props.h2_title}</h2>
  if (props.note)
    note = (
      <p key="note" className={styles.note}>
        {props.note}
      </p>
    )

  return (
    <div className={styles.form}>
      {h2Title}
      {note}
      {formInputs}
      {submitBtn}
      <div key="add_link" className={styles.addLink}>
        {props.additional_nodes}
      </div>
    </div>
  )
}
