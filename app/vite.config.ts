import path from 'path';
import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';
import { defineConfig } from 'vite';

dotenv.config({ path: './.env' });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: `/${process.env.SUB_DIR_PATH_BUILDER}/`,
  define: {
    VITE_DEFINE_BASE_PATH: JSON.stringify(process.env.SUB_DIR_PATH_BUILDER),
    VITE_SPREAD_SHEET_KEY: JSON.stringify(process.env.SPREAD_SHEET_KEY),
  },
  resolve: {
    alias: {
      '@yakumi-app': path.join(__dirname, './src'),
      '@yakumi-components': path.join(__dirname, '../packages/ui/src'),
    },
  },
  build: {
    outDir: path.resolve(__dirname, '../dist/app'),
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          reactSWC: ['react/jsx-runtime'],
          reactFamily: ['react-router-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
          others: ['date-fns', 'papaparse', 'lodash'],
          udon: ['file-saver', 'jszip'],
          canvas: ['html2canvas'],
          blueprint: ['@blueprintjs/core'],
          yakumiUi: ['@yakumi-components/index'],
          hollowCard: ['@yakumi-app/domain/hollow/constants'],
          msw: ['msw'],
          azure: ['@azure/storage-blob'],
        },
      },
    },
  },
});
