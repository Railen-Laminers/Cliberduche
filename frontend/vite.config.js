import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // allow accessing the dev server from other devices on the LAN (mobile)
    host: true,
    // default port (can be adjusted) — leave strictPort false so Vite can pick another port if busy
    port: 5173,
  },
})
