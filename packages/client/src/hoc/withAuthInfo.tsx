import { useState, useMemo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { setUserContext, selectUserLoading, selectUserUserInfo } from 'reducers/user'
import store from 'store'
import PageLoader from '../components/pageLoader'
import AuthContext from '../context/authContext'
import AuthService from '../service/auth.service'
import oAuthService from '../service/oauth.service'

const withAuthInfo = (OriginalComponent: React.ComponentType) => {
  const ComponentWithAuth = (props: Record<string, unknown>) => {
    const loading = useSelector(selectUserLoading)
    const UserInfo = useSelector(selectUserUserInfo)
    const [isAuth, setAuth] = useState<boolean>(!!UserInfo)
    const authInfo = useMemo(() => ({ isAuth, setAuth }), [isAuth])

    useEffect(() => {
      ;(async () => {
        const urlParams = new URLSearchParams(window.location.search)
        const code = urlParams.get('code')
        if (code) {
          await oAuthService.executeOAuth(code)
        }
        const user = await AuthService.getUser()
        if (user && user.id > 0) {
          store.dispatch(setUserContext(user))
          setAuth(true)
          return
        }
        setAuth(false)
      })()
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
