import { useToaster } from '@gravity-ui/uikit'
import { useEffect } from 'react'
import { isApiError } from 'types/types'

export const useApiErrorToast = (error: unknown) => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { add } = useToaster()

  useEffect(() => {
    if (!isApiError(error)) return

    const errorText = error.data.reason ?? error.data.message ?? 'Unknown Error'
    add({
      title: 'Ошибка',
      name: errorText,
      content: errorText,
      isClosable: true,
      autoHiding: 5000,
      type: 'error',
    })
  }, [add, error])
}
