import customConfig from '@yakumi/eslint-config-custom/defaults.js';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import reactHooksConfig from 'eslint-plugin-react-hooks';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname
});

export default tseslint.config({
  files: ['**/*.ts', '**/*.tsx'],
  ignores: ['dist', 'public'],
  extends: [...customConfig, ...compat.extends('eslint-config-turbo'), prettierConfig],
  plugins: {
    'react-refresh': reactRefreshPlugin,
    'react-hooks': reactHooksConfig,
  },
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'import/extensions': ['off'],
  },
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    globals: {
      ...globals.browser,
      myCustomGlobal: 'readonly',
    },
  },
});