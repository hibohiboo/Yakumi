import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
// import unuserdPlugin from 'eslint-plugin-unused-imports';

export default tseslint.config({
  extends: [js.configs.recommended, ...tseslint.configs.recommended],
  plugins: { import: importPlugin, 
    // 'unused-imports': unuserdPlugin
  },
  rules: {
    semi: ['error', 'always'],
    // 'unused-imports/no-unused-imports': 'warn',
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
