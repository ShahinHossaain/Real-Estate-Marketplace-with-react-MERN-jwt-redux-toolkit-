import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // proxy: {
    //   '/api': {
    //     target: 'https://real-estate-api-fmqk.onrender.com',
    //     // target: 'http://localhost:5173',
    //     secure: false
    //   }
    // }
  },
  plugins: [react()],
})
