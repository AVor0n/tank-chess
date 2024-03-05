import { io } from 'socket.io-client'

class WSService {
  public sessionId?: string

  public readonly socket = io({
    autoConnect: false,
  })

  constructor() {
    this.socket.on('session', ({ sessionId }: { sessionId: string }) => {
      this.socket.auth = { sessionId }
      localStorage.setItem('sessionId', sessionId)
      this.sessionId = sessionId
    })
  }

  public connect = (userId: number, username: string) => {
    const sessionId = localStorage.getItem('sessionId')

    this.socket.auth = {
      userId,
      sessionId,
      username,
    }

    this.socket.connect()
  }
}

const wsService = new WSService()
export default wsService
