import ReactDOM from 'react-dom/client'
import '@gravity-ui/uikit/styles/styles.css'
import './assets/styles/index.css'
import { Provider } from 'react-redux'
import App from './app'
import store from './store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
