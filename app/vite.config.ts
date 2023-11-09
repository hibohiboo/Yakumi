/* eslint-disable turbo/no-undeclared-env-vars */
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
});
