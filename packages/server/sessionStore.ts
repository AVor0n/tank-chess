interface Session {
  sessionId: string
  userId: number
  username: string
}

class SessionStore {
  private sessions = new Map<string, Session>()

  findSession(id: string) {
    return this.sessions.get(id)
  }

  saveSession(id: string, session: Session) {
    this.sessions.set(id, session)
  }

  findAllSessions() {
    return [...this.sessions.values()]
  }
}

export const sessionStore = new SessionStore()
