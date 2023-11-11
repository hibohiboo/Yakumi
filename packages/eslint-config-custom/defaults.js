module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "ignorePatterns": ["dist", ".eslintrc.cjs"],
  "parser": "@typescript-eslint/parser",
  "plugins": ["import", "unused-imports"],
  "rules": {
    "semi": ["error", "always"],
    "unused-imports/no-unused-imports": "warn", 
    "import/order": ["warn", { "groups": ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"] // importの並び順の設定
                             , "pathGroupsExcludedImportTypes": ["builtin"]
                             , "pathGroups": [{ "pattern": "@src/**", "group": "parent", "position": "before"}] // エイリアスの位置を指定
                             , "alphabetize": { "order": "asc"} // グループ内のソート順
                             }
                    ]
  },
};
