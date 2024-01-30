import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createStaticHandler, StaticRouterProvider, createStaticRouter } from 'react-router-dom/server'
import routes from './src/router'
import { createStoreWithData } from './src/store'
import App from './src/app'
import PreloadStoreScript from './src/components/PreloadStoreScript'

let handler = createStaticHandler(routes)

const createFetchRequest = req => {
  let origin = `${req.protocol}://${req.get('host')}`

  let url = new URL(req.originalUrl || req.url, origin)

  let controller = new AbortController()
  req.on('close', () => controller.abort())

  let headers = new Headers()

  for (let [key, values] of Object.entries(req.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (let value of values) {
          headers.append(key, value)
        }
      } else {
        headers.set(key, values)
      }
    }
  }

  let init = {
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

  let fetchRequest = createFetchRequest(req)
  let context = await handler.query(fetchRequest)

  if (context instanceof Response) {
    throw context
  }

  let router = createStaticRouter(handler.dataRoutes, context)

  const Router = () => <StaticRouterProvider router={router} context={context} />

  return renderToString(
    <Provider store={store}>
      <App RouterProvider={Router} />
      <PreloadStoreScript preloadedState={preloadedState} />
    </Provider>,
  )
}
