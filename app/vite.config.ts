/* eslint-disable turbo/no-undeclared-env-vars */
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
  },
  resolve: {
    alias: {
      '@app': path.join(__dirname, './src'),
      '@yakumi-components': path.join(__dirname, '../packages/ui/src'),
    },
  },
});
