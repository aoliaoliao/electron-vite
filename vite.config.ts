import { rmSync } from 'fs'
import { join } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron/renderer'

const path = require('path')

rmSync('dist', { recursive: true, force: true }) // v14.14.0

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    },
  },
  server: {
    proxy: {
      '/wp-json/wp': {
        target: 'http://githubtv.com/index.php',
        changeOrigin: true,
      },
      '/wp-json/jwt-auth': {
        target: 'http://githubtv.com',
        changeOrigin: true,
      }
    }
  },
  plugins: [
    vue(),
    electron({
      main: {
        entry: 'electron/main/index.ts',
        vite: {
          build: {
            sourcemap: false,
            outDir: 'dist/electron/main',
          },
        },
      },
      preload: {
        input: {
          // You can configure multiple preload here
          splash: join(__dirname, 'electron/preload/splash.ts'),
        },
        vite: {
          build: {
            // For debug
            sourcemap: 'inline',
            outDir: 'dist/electron/preload',
          }
        }
      },
    }),
    // Enable use Electron, Node.js API in Renderer-process
    renderer(),
  ],
})
