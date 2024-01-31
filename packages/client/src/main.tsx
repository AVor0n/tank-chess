import ReactDOM from 'react-dom/client'
import '@gravity-ui/uikit/styles/styles.css'
import './assets/styles/index.css'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './app'
import routes from './router'
import { createStoreWithData, type RootStateType } from './store'

const preloadState = window.__PRELOADED_STATE__
delete window.__PRELOADED_STATE__

const router = createBrowserRouter(routes)
const preloadedState = preloadState?.preloadedState
const store = createStoreWithData(preloadedState as RootStateType)

const Router = () => <RouterProvider router={router} />

ReactDOM.hydrateRoot(
  document.getElementById('root')!,
  <Provider store={store}>
    <App RouterProvider={Router} />
  </Provider>,
)
