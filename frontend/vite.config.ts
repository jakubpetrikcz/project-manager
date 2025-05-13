import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy pro Asana OAuth
      '/oauth_token': {
        target: 'https://app.asana.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/oauth_token/, '/-/oauth_token'),
      },
    },
  },
})
