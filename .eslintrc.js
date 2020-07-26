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
  plugins: [
    "@typescript-eslint",
    "react",
    "react-hooks",
    "jsx-a11y",
    "@calm/react-intl",
  ],
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
    "@calm/react-intl/missing-formatted-message": [
      "error",
      {
        noTrailingWhitespace: true,
        ignoreLinks: false,
        enforceLabels: true,
        enforceImageAlts: false,
        enforceInputProps: true,
      },
    ],
    "@calm/react-intl/missing-attribute": [
      "error",
      {
        noTrailingWhitespace: true,
        noSpreadOperator: false,
        requireDescription: false,
        formatDefineMessages: true,
        requireDefaultMessage: true,
        requireIdAsString: true,
      },
    ],
    "@calm/react-intl/missing-values": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
