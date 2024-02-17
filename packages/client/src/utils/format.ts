/** Форматирует дату в строку формата "31 янв. 2024 г., 05:10" */
export const datetimeFormatter = (rawDate: string | Date) => {
  const date = typeof rawDate === 'string' ? new Date(rawDate) : rawDate

  return date?.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat('ru', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateStr))
}
