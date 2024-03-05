import { randomUUID } from 'crypto'
import { type Server } from 'socket.io'
import { sessionStore } from '../sessionStore'
import { type SessionSocket } from '../types'

interface Player {
  id: number
  name: string
  sessionId: string
}

interface GameRoom {
  id: string
  playerId1: Player
  playerId2: Player | null
}

export class Game {
  private static rooms = new Map<string, GameRoom>()
  private static io: Server | null = null

  public static readonly createRoom = async (socket: SessionSocket) => {
    const roomId = randomUUID()
    const sessionId = socket.sessionId!

    const session = sessionStore.findSession(sessionId)
    if (!session) {
      console.error(`Session "${sessionId}" not found`)
      return
    }
    this.rooms.set(roomId, {
      id: roomId,
      playerId1: {
        id: session.userId,
        name: session.username,
        sessionId,
      },
      playerId2: null,
    })
    await socket.join(roomId)
    console.log(`~~ ${session.username} create room ${roomId}~~`)
    socket.emit('room-created', roomId)
    return roomId
  }

  public static readonly deleteRoom = (roomId: string) => {
    console.log(`~~ delete room ${roomId}~~`)
    this.rooms.delete(roomId)
  }

  public static readonly getRoom = (roomId: string) => {
    console.log(`~~ request room ${roomId}~~`)

    return this.rooms.get(roomId)
  }

  public static readonly joinToRoom = async (socket: SessionSocket, roomId: string) => {
    const sessionId = socket.sessionId!
    const room = this.rooms.get(roomId)
    if (!room) {
      console.error(`Room "${roomId}" not found`)
      return
    }

    const session = sessionStore.findSession(sessionId)
    if (!session) {
      console.error(`Session "${sessionId}" not found`)
      return
    }

    this.rooms.set(roomId, {
      ...room,
      playerId2: {
        id: session.userId,
        name: session.username,
        sessionId,
      },
    })

    await socket.join(roomId)

    console.log(`~~ ${session.username} join to room ${roomId}~~`)
    this.io?.to(roomId)?.emit('start', {
      player1: {
        id: room.playerId1.id,
        name: room.playerId1.name,
      },
      player2: {
        id: session.userId,
        name: session.username,
      },
    })
  }

  public static readonly connectSocket = (io: Server) => {
    this.io = io
  }

  public static readonly disconnectSocket = () => {
    this.io = null
  }
}
