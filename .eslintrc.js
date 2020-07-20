module.exports = {
  root: true,
  ignorePatterns: [
    "**/.eslintrc.js",
    "**/*.generated.ts",
    "**/*.generated.tsx",
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["@typescript-eslint", "react", "react-hooks", "jsx-a11y"],
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        args: "after-used",
      },
    ],
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
