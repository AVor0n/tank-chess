import { Navigate, Outlet, useLocation } from 'react-router-dom'
import PageLoader from '@components/pageLoader'
import { api } from 'reducers/api'
import { selectorIsAuth } from 'reducers/auth'
import { useAppSelector } from 'reducers/hooks'

export const PrivateRoute = () => {
  const location = useLocation()
  const { isLoading } = api.useGetUserQuery()
  const isAuth = useAppSelector(selectorIsAuth)

  if (isLoading) return <PageLoader />
  if (!isAuth) return <Navigate to="/login" state={{ from: location }} replace />
  return <Outlet />
}
