import { useState, useMemo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import PageLoader from '../components/pageLoader'
import AuthContext from '../context/authContext'
import AuthService from '../service/auth.service'
import { type RootStateType } from '../store'

const withAuthInfo = (OriginalComponent: React.ComponentType) => {
  const ComponentWithAuth = () => {
    const loading = useSelector((state: RootStateType) => state.user.loading)
    const [isAuth, setAuth] = useState<boolean>(false)
    const authInfo = useMemo(() => ({ isAuth, setAuth }), [isAuth])

    useEffect(() => {
      const fetchUser = async () => {
        const user = await AuthService.getUser()
        if (user && user.id > 0) setAuth(true)
      }
      fetchUser()
    }, [])

    return (
      <>
        {loading ? (
          <PageLoader />
        ) : (
          <AuthContext.Provider value={authInfo}>
            <OriginalComponent />
          </AuthContext.Provider>
        )}
      </>
    )
  }

  return ComponentWithAuth
}
export default withAuthInfo
