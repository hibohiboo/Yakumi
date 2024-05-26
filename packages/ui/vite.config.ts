import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // viteのホットリロードのために、/で始める必要がある。
    alias: [{ find: '@yakumi-components', replacement: '/src' }],
  },
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react/jsx-runtime'],
          icons: ['react-icons'],
          others: ['dompurify'],
          storybook: ['@storybook/react'],
          storybookFamily: ['@storybook/blocks'], // 696.34kb
        },
      },
    },
  },
});
