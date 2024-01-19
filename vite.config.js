import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),legacy({
    targets: ['defaults', 'not IE 11',"ios >= 12",
      "not ie <= 11",
      "not op_mini all",
      "not dead",
      "last 5 versions",
      "> 0.2%"],
  }),],
  base: '/WZO-Registration/',
})
