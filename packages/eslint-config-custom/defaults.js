import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import unuserdPlugin from 'eslint-plugin-unused-imports';

export default tseslint.config({
  extends: [js.configs.recommended, ...tseslint.configs.recommended],
  plugins: { import: importPlugin, 
    'unused-imports': unuserdPlugin
  },
  rules: {
    semi: ['error', 'always'],
    // unuserd-importsのrecommended設定を適用
    "no-unused-vars": "off", // or "@typescript-eslint/no-unused-vars": "off",
    'unused-imports/no-unused-imports': 'warn',
    "unused-imports/no-unused-vars": [
      "warn",
      {
          "vars": "all",
          "varsIgnorePattern": "^_",
          "args": "after-used",
          "argsIgnorePattern": "^_",
      },
    ],
    // ここまで unuserd-importsのrecommended設定を適用
    'import/order': [
      'warn',
      {
        groups: [ 'builtin','external','internal','parent','sibling','index','object','type' ], // importの並び順の設定
        pathGroupsExcludedImportTypes: ['builtin'],
        pathGroups: [ { pattern: '@src/**', group: 'parent', position: 'before' } ], // エイリアスの位置を指定
        alphabetize: { order: 'asc' }, // グループ内のソート順
      },
    ],
  },
});
