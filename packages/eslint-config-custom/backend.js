module.exports = {
  env: { es2020: true, node: true },
  extends: [
    "@yakumi/eslint-config-custom/defaults",
    "turbo",
    "prettier", // extends に複数設定している場合、後に書いた設定のルールが優先されるため、prettierは最後
  ],
  rules: {
    "turbo/no-undeclared-env-vars": ["off"],
  }

};
