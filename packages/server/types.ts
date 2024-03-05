import type { Socket } from 'socket.io'

export interface SessionSocket extends Socket {
  sessionId?: string
  userId?: number
  username?: string
  handshake: Socket['handshake'] & {
    auth: {
      userId?: number
      username?: string
      sessionId?: string
    }
  }
}
