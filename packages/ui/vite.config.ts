import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // viteのホットリロードのために、/で始める必要がある。
    alias: [{ find: '@yakumi-components', replacement: '/src' }],
  },
});
