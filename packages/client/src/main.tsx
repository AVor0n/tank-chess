import ReactDOM from 'react-dom/client'
import '@gravity-ui/uikit/styles/styles.css'
import './assets/styles/index.css'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import store from 'store'
import App from './app'
import routes from './router'

const router = createBrowserRouter(routes)
const Router = () => <RouterProvider router={router} />

ReactDOM.hydrateRoot(
  document.getElementById('root')!,
  <Provider store={store}>
    <App RouterProvider={Router} />
  </Provider>,
)
