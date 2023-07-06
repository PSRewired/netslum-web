import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import sass from 'sass'

import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: 'public',
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
      }
    }
  },
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    },
  },
  plugins: [react()],
})
