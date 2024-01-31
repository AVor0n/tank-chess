import { useContext, useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import AuthContext from '../../context/authContext'

export const PrivateRoute = () => {
  const { isAuth } = useContext(AuthContext)
  const [code, setCode] = useState<string | null>(null)
  const location = useLocation()
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    setCode(code)
  }, [])

  return isAuth || code ? <Outlet /> : <Navigate to="/login" state={{ location }} replace />
}
