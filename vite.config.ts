import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import { defineConfig } from 'vite'

// @ts-ignore
import manifest from './manifest.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest }), tsconfigPaths()],
})
