/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ["@remix-run/eslint-config", "@remix-run/eslint-config/node"],
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "warn",
  },
};
