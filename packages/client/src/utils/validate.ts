import {
  VALID_EMAIL,
  VALID_PASSWORD,
  VALID_LOGIN,
  VALID_PHONE,
  VALID_NAME,
  REQUIRED,
  MIN_LENGTH,
  MAX_LENGTH,
  errors,
} from './constants'

const passwordRule = {
  [VALID_PASSWORD]: true,
  [MIN_LENGTH]: 8,
  [MAX_LENGTH]: 40,
  [REQUIRED]: true,
}

const rules: Record<string, Record<string, boolean | number>> = {
  email: {
    [VALID_EMAIL]: true,
    [REQUIRED]: true,
    [MIN_LENGTH]: 8,
    [MAX_LENGTH]: 40,
  },

  login: {
    [MIN_LENGTH]: 3,
    [MAX_LENGTH]: 20,
    [VALID_LOGIN]: true,
  },
  phone: {
    [VALID_PHONE]: true,
    [MIN_LENGTH]: 10,
    [MAX_LENGTH]: 15,
  },
  message: {
    [REQUIRED]: true,
  },
  first_name: {
    [VALID_NAME]: true,
  },
  second_name: {
    [VALID_NAME]: true,
  },
  password: passwordRule,
  oldPassword: passwordRule,
  newPassword: passwordRule,
}

type ICheck = (value: string, length?: number | undefined) => boolean

const validateField: Record<string, ICheck> = {
  [VALID_EMAIL]: value => !!value.match(/^[A-Z0-9._-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i),
  [VALID_PASSWORD]: value => !!value.match(/^(?=.*[A-Z])(?=.*\d).+$/),
  [VALID_LOGIN]: value => !!value.match(/^(?!\d+$)[a-zA-Z0-9_-]+$/),
  [VALID_PHONE]: value => !!value.match(/^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/),
  [VALID_NAME]: value => !!value.match(/^([A-ZА-ЯЁ])[a-zA-Zа-яёА-ЯЁ-]+$/),
  [MIN_LENGTH]: (value, length) => (length ? value.length >= length : true),
  [MAX_LENGTH]: (value, length) => (length ? value.length <= length : true),
  [REQUIRED]: value => !!value,
}

export const formValidate = (fields: Record<string, File | string>): Record<string, File | string> => {
  if (Object.keys(fields).length === 0) {
    return {}
  }

  return Object.entries(fields).reduce((acc: Record<string, string>, [key, valueField]: [string, string | File]) => {
    if (!rules[key]) {
      return acc
    }
    const validates = rules[key]
    for (const [rule, valueRule] of Object.entries(validates)) {
      if (valueRule === undefined || valueRule === null || valueRule === false) {
        return acc
      }
      const fn = validateField[rule]

      if (fn && typeof fn === 'function') {
        if (typeof valueField === 'string') {
          const length = typeof valueRule === 'number' ? valueRule : undefined
          const isValid = fn(valueField, length)
          if (!isValid) {
            acc[key] = errors.default
            break
          }
        }
      }
    }
    return acc
  }, {})
}

export default formValidate
