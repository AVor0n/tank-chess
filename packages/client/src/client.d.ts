declare const __SERVER_PORT__: number

interface Window {
  __PRELOADED_STATE__?: Record<string, unknown>
}

declare module '*.module.scss' {
  const value: Record<string, string>
  export default value
}

declare module '*.png' {
  const path: string
  export default path
}

declare module '*.svg' {
  const path: string
  export default path
}

declare module '*.jpg' {
  const path: string
  export default path
}
