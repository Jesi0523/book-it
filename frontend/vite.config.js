import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url';

export default defineConfig(({ mode }) => {

  // Carga las variables del archivo .env
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        // El simbolo '@' apunta a la carpeta 'src'
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    // Definimos en que puerto se ejecutara react
    server: {
      port: parseInt(env.PORT) || 5173,
      strictPort: true,
    },
    optimizeDeps: {
      include: [
        '@emotion/react',
        '@emotion/styled',
        'swiper',
        'react-router-dom'
      ],
    },
  }
})
