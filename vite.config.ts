// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/japede-cardapio/',
  envPrefix: 'NEXT_PUBLIC_', // This ensures variables starting with NEXT_PUBLIC_ are exposed
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, './')
      }
    ]
  },
  // Configuração para melhorar a compatibilidade com o Windows
  server: {
    fs: {
      strict: false
    },
    watch: {
      usePolling: true
    }
  },
  // Configuração para melhorar o build
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@headlessui/react', '@heroicons/react'],
          utils: ['date-fns', 'clsx', 'tailwind-merge']
        }
      }
    }
  },
  // Configuração para melhorar o HMR
  optimizeDeps: {
    exclude: ['lucide-react']
  }
});
