import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createStaticHandler, StaticRouterProvider, createStaticRouter } from 'react-router-dom/server'
import routes from './src/router'
import { createStoreWithData } from './src/store'
import App from './src/app'
import PreloadStoreScript from './src/components/PreloadStoreScript'

const handler = createStaticHandler(routes)

const createFetchRequest = req => {
  const origin = `${req.protocol}://${req.get('host')}`

  const url = new URL(req.originalUrl || req.url, origin)

  const controller = new AbortController()
  req.on('close', () => controller.abort())

  const headers = new Headers()

  for (const [key, values] of Object.entries(req.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (const value of values) {
          headers.append(key, value)
        }
      } else {
        headers.set(key, values)
      }
    }
  }

  const init = {
    method: req.method,
    headers,
    signal: controller.signal,
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = req.body
  }

  return new Request(url.href, init)
}

export async function render(req, preloadState) {
  const store = createStoreWithData(preloadState as any)

  const preloadedState = store.getState()

  const fetchRequest = createFetchRequest(req)
  const context = await handler.query(fetchRequest)

  if (context instanceof Response) {
    throw context
  }

  const router = createStaticRouter(handler.dataRoutes, context)

  const Router = () => <StaticRouterProvider router={router} context={context} />

  return renderToString(
    <Provider store={store}>
      <App RouterProvider={Router} />
      <PreloadStoreScript preloadedState={preloadedState} />
    </Provider>,
  )
}
