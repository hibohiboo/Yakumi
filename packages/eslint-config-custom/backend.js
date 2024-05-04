import globals from 'globals';
import tseslint from 'typescript-eslint';
import customConfig from '@yakumi/eslint-config-custom/defaults.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname
});

export default tseslint.config({
  files: ['**/*.ts', '**/*.tsx'],
  ignores: ['dist', 'public'],
  extends: [...customConfig, ...compat.extends('eslint-config-turbo'),  prettierConfig],
  rules: {
    "turbo/no-undeclared-env-vars": ["off"],
  },
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    globals: {
      ...globals.node,
      myCustomGlobal: 'readonly',
    },
  },
});
