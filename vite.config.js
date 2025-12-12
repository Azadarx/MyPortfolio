import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ==================== ENVIRONMENT CONFIGURATION ====================
// Uncomment the environment you want to use

// PRODUCTION - Use this for deployed version (no proxy needed)
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    cors: true
  }
})

// DEVELOPMENT - Use this for local development with proxy
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 5173,
//     proxy: {
//       '/api': {
//         target: 'http://localhost:5000',
//         changeOrigin: true,
//         secure: false,
//         rewrite: (path) => path.replace(/^\/api/, '/api')
//       },
//       '/socket.io': {
//         target: 'ws://localhost:5000',
//         ws: true,
//         changeOrigin: true,
//         secure: false
//       }
//     },
//     cors: true
//   }
// })

// ===================================================================