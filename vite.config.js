import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/qr-generator/', // Ajusta esto según el nombre de tu repositorio
}) 