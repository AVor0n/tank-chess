const isObject = (value: unknown): value is NonNullable<object> => typeof value === 'object' && value !== null

export const isEqual = (value1: unknown, value2: unknown): boolean => {
  if (!isObject(value1) || !isObject(value2)) {
    return value1 === value2
  }

  const keys1 = Object.keys(value1)
  const keys2 = Object.keys(value2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    if (!isEqual(value1[key as keyof typeof value1], value2[key as keyof typeof value1])) {
      return false
    }
  }

  return true
}
