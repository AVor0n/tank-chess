import { useState, useMemo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import PageLoader from '../components/pageLoader'
import AuthContext from '../context/authContext'
import { selectUserLoading, selectUserUserInfo } from '../reducers/user'
import AuthService from '../service/auth.service'

const withAuthInfo = (OriginalComponent: React.ComponentType) => {
  const ComponentWithAuth = (props: Record<string, unknown>) => {
    const loading = useSelector(selectUserLoading)
    const UserInfo = useSelector(selectUserUserInfo)
    const [isAuth, setAuth] = useState<boolean>(!!UserInfo)
    const authInfo = useMemo(() => ({ isAuth, setAuth }), [isAuth])

    useEffect(() => {
      const fetchUser = async () => {
        const user = await AuthService.getUser()
        if (user && user.id > 0) {
          setAuth(true)
          return
        }
        setAuth(false)
      }
      fetchUser()
    }, [])

    return (
      <>
        {loading ? (
          <PageLoader />
        ) : (
          <AuthContext.Provider value={authInfo}>
            <OriginalComponent {...props} />
          </AuthContext.Provider>
        )}
      </>
    )
  }

  return ComponentWithAuth
}
export default withAuthInfo
