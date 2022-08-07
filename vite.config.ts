import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'
import stylelint from 'vite-plugin-stylelint'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    vue(),
    eslint(),
    stylelint(),
    AutoImport({ resolvers: [ElementPlusResolver()] }),
    Components({ resolvers: [ElementPlusResolver()] }),
  ],
  base: 'driver-waste-free-app',
})
