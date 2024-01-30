import { useState, useMemo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { setUserContext, selectUserLoading } from 'reducers/user'
import store from 'store'
import PageLoader from '../components/pageLoader'
import AuthContext from '../context/authContext'
import AuthService from '../service/auth.service'
import oAuthService from '../service/oauth.service'

const withAuthInfo = (OriginalComponent: React.ComponentType) => {
  const ComponentWithAuth = () => {
    const loading = useSelector(selectUserLoading)
    const [isAuth, setAuth] = useState<boolean>(false)
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
        }
      })()
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
