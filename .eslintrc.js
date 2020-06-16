module.exports = {
  root: true,
  ignorePatterns: ["**/.eslintrc.js"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["@typescript-eslint", "react"],
  rules: {
    "sort-keys": [
      "error",
      "asc",
      {
        natural: true,
      },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
