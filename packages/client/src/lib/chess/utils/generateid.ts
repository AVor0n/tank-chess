let counter = 0

export const generateId = (prefix = '') => `${prefix}_${counter++}`
