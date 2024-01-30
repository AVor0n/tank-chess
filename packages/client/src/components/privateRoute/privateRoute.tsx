import { useContext } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import AuthContext from '../../context/authContext'

export const PrivateRoute = () => {
  const { isAuth } = useContext(AuthContext)
  const location = useLocation()
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')
  return isAuth || code ? <Outlet /> : <Navigate to="/login" state={{ location }} replace />
}
