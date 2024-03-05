/// <reference types="vite/client" />
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

interface ImportMetaEnv {
  readonly BASE_URL: string
  readonly DEV: boolean
  readonly PROD: boolean
  readonly SSR: boolean
  readonly MODE: 'development' | 'production'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
