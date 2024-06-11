import { randomUUID } from 'crypto'
import * as fs from 'fs'
import { createServer as createHttpServer } from 'http'
import * as path from 'path'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { type Request } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { Server } from 'socket.io'
import { createServer as createViteServer, type ViteDevServer } from 'vite'
import { LOCAL_ORIGINS, PORT } from './constants'
import { postgresConnect } from './db'
import { authMiddleware, type RequestWithUserInfo } from './middleware/auth.middleware'
import { errorMiddleware } from './middleware/error.middleware'
import { Game } from './models/game'
import { apiRoutes } from './routes'
import { sessionStore } from './sessionStore'
import { type SessionSocket } from './types'

dotenv.config()

const isDev = process.env.NODE_ENV === 'development'

async function createServer() {
  const app = express()

  app.use(
    cors({
      credentials: true,
      origin: [...LOCAL_ORIGINS],
    }),
  )

  let vite: ViteDevServer | undefined
  const distPath = path.dirname(require.resolve('client/dist/index.html'))
  const srcPath = path.dirname(require.resolve('client'))
  const ssrClientPath = require.resolve('client/ssr-dist/ssr.cjs')

  app.use(
    createProxyMiddleware('/api/proxy/**', {
      target: 'https://ya-praktikum.tech/api/v2',
      changeOrigin: true,
      cookieDomainRewrite: {
        'ya-praktikum.tech': isDev ? 'localhost' : 'tank-chess.ya-praktikum.tech',
      },
      pathRewrite: reqPath => reqPath.replace('api/proxy', ''),
    }),
  )
  app.use(authMiddleware)
  app.use('/api', apiRoutes)

  if (isDev) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
      ssr: {
        noExternal: ['@gravity-ui/uikit'],
      },
    })
    app.use(vite.middlewares)
  }

  if (!isDev) {
    app.use('/', express.static(distPath, { index: false }))
  }

  app.use('*', async (req: RequestWithUserInfo, res, next) => {
    const url = req.originalUrl

    try {
      let template: string

      if (!isDev) {
        template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8')
      } else {
        template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8')

        template = await vite!.transformIndexHtml(url, template)
      }

      interface SSRModule {
        render: (req: Request, preloadData?: Record<string, unknown>) => Promise<string>
      }

      let mod: SSRModule

      if (!isDev) {
        mod = (await import(ssrClientPath)) as SSRModule
      } else {
        mod = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx'), { fixStacktrace: true })) as SSRModule
      }

      const { render } = mod

      const userInfo = req.userInfo

      const preloadedState = {
        auth: {
          userInfo,
        },
      }

      const appHtml = await render(req, preloadedState)
      const html = template.replace(`<!--ssr-outlet-->`, appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      if (isDev) {
        vite!.ssrFixStacktrace(e as Error)
      }
      next(e)
    }
  })
  app.use(errorMiddleware)

  return createHttpServer(app)
}

async function startServer() {
  await postgresConnect()

  const server = await createServer()
  const io = new Server(server)

  io.use((socket: SessionSocket, next) => {
    let sessionId = socket.handshake.auth.sessionId ?? ''
    let session = sessionStore.findSession(sessionId)

    if (!session) {
      const { userId, username } = socket.handshake.auth
      if (!userId || !username) {
        next(new Error('cannot find user'))
        return
      }

      sessionId = randomUUID()
      session = { username, userId, sessionId }
      sessionStore.saveSession(sessionId, session)
      console.log(`save ${sessionId}`)
    }

    socket.userId = session.userId
    socket.username = session.username
    socket.sessionId = session.sessionId
    next()
  })

  io.on('connection', (socket: SessionSocket) => {
    socket.emit('session', {
      sessionId: socket.sessionId,
      userId: socket.userId,
    })

    socket.on('create-room', () => Game.createRoom(socket))
    socket.on('join-to-room', (roomId: string) => Game.joinToRoom(socket, roomId))
    socket.on(
      'sent-room-event',
      ({ event, roomId, payload }: { event: string; roomId: string; payload: Record<string, string> }) => {
        io.to(roomId).except(socket.id).emit(event, payload)
      },
    )
  })

  Game.connectSocket(io)

  server.listen(PORT, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${PORT}`)
  })
}

startServer()
