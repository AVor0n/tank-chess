import { useState, useMemo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import PageLoader from '../components/pageLoader'
import AuthContext from '../context/authContext'
import { selectUserLoading } from '../reducers/user'
import AuthService from '../service/auth.service'
//import oAuthService from '../service/oauth.service'

const withAuthInfo = (OriginalComponent: React.ComponentType) => {
  const ComponentWithAuth = () => {
    const loading = useSelector(selectUserLoading)
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
