import * as fs from 'fs'
import * as path from 'path'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { type Request } from 'express'
import { createServer as createViteServer, type ViteDevServer } from 'vite'
import { authMiddleware } from './middleware/auth.middleware'

dotenv.config()

const isDev = () => process.env.NODE_ENV === 'development'

async function startServer() {
  const app = express()
  app.use(cors())
  const port = Number(process.env.SERVER_PORT) || 3001

  let vite: ViteDevServer | undefined
  const distPath = path.dirname(require.resolve('client/dist/index.html'))
  const srcPath = path.dirname(require.resolve('client'))
  const ssrClientPath = require.resolve('client/ssr-dist/ssr.cjs')

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: 'ssr' },
      root: srcPath,
      appType: 'custom',
      ssr: {
        noExternal: ['@gravity-ui/uikit'],
      },
    })
    app.use(vite.middlewares)
  }

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })

  if (!isDev()) {
    app.use('/', express.static(distPath, { index: false }))
  }

  app.use(authMiddleware)

  /* eslint-disable @typescript-eslint/no-misused-promises*/
  app.use('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template: string

      if (!isDev()) {
        template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8')
      } else {
        template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8')

        template = await vite!.transformIndexHtml(url, template)
      }

      interface SSRModule {
        render: (req: Request, preloadData?: Record<string, unknown>) => Promise<string>
      }

      let mod: SSRModule

      if (!isDev()) {
        mod = (await import(ssrClientPath)) as SSRModule
      } else {
        mod = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx'), { fixStacktrace: true })) as SSRModule
      }

      const { render } = mod

      // Мок для ssr страниц авторизации
      const preloadedState = {
        user: {
          userInfo: {
            id: 2,
            first_name: 'Тест',
            second_name: 'Тест',
            display_name: null,
            login: 'test',
            avatar: null,
            email: 'test@ya.ru',
            phone: '89008008080',
          },
          loading: false,
        },
      }

      const appHtml = await render(req, preloadedState)
      const html = template.replace(`<!--ssr-outlet-->`, appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      if (isDev()) {
        vite!.ssrFixStacktrace(e as Error)
      }
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`, isDev())
  })
}

startServer()
