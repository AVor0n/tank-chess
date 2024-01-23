import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import typescriptPaths from 'vite-tsconfig-paths'
import checker from 'vite-plugin-checker'

export default defineConfig({
  plugins: [
    react(),
    typescriptPaths(),
    checker({
      typescript: true,
    }),
  ],
  build: {
    outDir: 'ssr-dist',
    ssr: true,
    lib: {
      entry: path.resolve(__dirname, 'ssr.tsx'),
      name: 'Client',
      formats: ['cjs'],
    },
    rollupOptions: {
      output: {
        dir: 'ssr-dist',
      },
    },
  },
  ssr: {
    format: 'cjs',
  },
})
