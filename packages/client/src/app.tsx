'use client'
import { ThemeProvider } from '@gravity-ui/uikit'
import { type FC } from 'react'
import Error from '@components/error'
import withAuthInfo from './hoc/withAuthInfo'
import registerServiceWorker from './utils/serviceWorker'

if (process.env.NODE_ENV === 'production') {
  registerServiceWorker()
}

interface Props {
  RouterProvider?: React.ComponentType
}

const App: FC<Props> = ({ RouterProvider }) => (
  <ThemeProvider theme="light">
    {RouterProvider ? <RouterProvider /> : null}
    <Error />
  </ThemeProvider>
)

export default withAuthInfo(App)
