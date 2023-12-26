import { useContext } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import AuthContext from '../../context/authContext'

export const PrivateRoute = () => {
  const { isAuth } = useContext(AuthContext)
  const location = useLocation()

  return isAuth ? <Outlet /> : <Navigate to="/login" state={{ location }} replace />
}
