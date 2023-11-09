module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "@yakumi/eslint-config-custom/defaults",
    "plugin:react-hooks/recommended",
    "turbo",
    "prettier",
  ],
  plugins: ["react-refresh", "import", "unused-imports"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "import/extensions":["off"]
    // ["error", "ignorePackages", { "js":"never","ts":"never","tsx":"never" }],
  },
};
