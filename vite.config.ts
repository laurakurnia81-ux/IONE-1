import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Polyfill process.env.API_KEY so the code inside services/geminiService.ts works
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
    server: {
      host: true
    }
  };
});