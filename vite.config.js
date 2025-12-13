import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  envPrefix: 'VITE_',
  
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'motion': ['framer-motion'],
          'icons': ['lucide-react'],
          'http': ['axios'],
          'toast': ['react-toastify']
        }
      },
      onwarn(warning, warn) {
        // Suppress specific warnings that don't affect functionality
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
        if (warning.code === 'SOURCEMAP_ERROR') return;
        if (warning.code === 'INVALID_ANNOTATION') return;
        if (warning.code === 'CIRCULAR_DEPENDENCY') return;
        
        // Use default for everything else
        warn(warning);
      }
    },
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  
  server: {
    port: 5173,
    cors: true,
    strictPort: false
  },
  
  preview: {
    port: 4173,
    strictPort: false
  },
  
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'axios',
      'framer-motion',
      'lucide-react',
      'react-toastify'
    ]
  }
})