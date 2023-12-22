import { type PaginationProps } from '@gravity-ui/uikit'
import { useCallback, useState } from 'react'

export const usePagination = (
  initialPageSize: number,
): [{ page: number; pageSize: number }, PaginationProps['onUpdate']] => {
  const [currentPage, setCurrentPage] = useState({
    page: 1,
    pageSize: initialPageSize,
  })

  const handleUpdate: PaginationProps['onUpdate'] = useCallback((page, pageSize) => {
    setCurrentPage(prevState => ({ ...prevState, page, pageSize }))
  }, [])

  return [currentPage, handleUpdate]
}
