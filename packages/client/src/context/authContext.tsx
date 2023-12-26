import { createContext } from 'react'

interface AuthContextType {
  isAuth: boolean
  setAuth: (statement: boolean) => void
}

const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  setAuth: () => {
    // do nothing.
  },
})

export default AuthContext
