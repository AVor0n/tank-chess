import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
import typescriptPaths from 'vite-tsconfig-paths'

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  plugins: [
    react(),
    typescriptPaths(),
    checker({
      typescript: true,
    }),
  ],
})
