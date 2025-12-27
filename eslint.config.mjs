import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import configPrettier from "eslint-config-prettier";
import eslint from "@eslint/js";
import react from "eslint-plugin-react";
import jsxA11Y from "eslint-plugin-jsx-a11y";
import calmReactIntl from "@calm/eslint-plugin-react-intl";
import pluginReactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default defineConfig([
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  react.configs.flat.recommended,
  configPrettier,
  jsxA11Y.flatConfigs.recommended,
  {
    ignores: [
      "**/*.generated.ts",
      "**/*.generated.tsx",
      "data/*",
      "dist-client/*",
    ],
  },
  {
    name: "main",
    plugins: {
      "@calm/react-intl": calmReactIntl,
      "react-hooks": pluginReactHooks,
    },
    rules: {
      "@calm/react-intl/missing-attribute": [
        "error",
        {
          formatDefineMessages: true,
          noSpreadOperator: false,
          noTrailingWhitespace: true,
          requireDefaultMessage: true,
          requireDescription: false,
          requireIdAsString: true,
        },
      ],
      "@calm/react-intl/missing-formatted-message": [
        "error",
        {
          enforceImageAlts: false,
          enforceInputProps: true,
          enforceLabels: true,
          ignoreLinks: false,
          noTrailingWhitespace: true,
        },
      ],
      "@calm/react-intl/missing-values": "error",
      "@typescript-eslint/no-unused-vars": ["warn", { args: "after-used" }],
      "jsx-a11y/aria-role": ["error", { ignoreNonDOM: true }],
      "react-hooks/exhaustive-deps": "error",
      "react-hooks/rules-of-hooks": "error",
      "sort-keys": ["error", "asc", { natural: true }],
    },

    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: [
      "postcss.config.js",
      "stylelint.config.mjs",
      "webpack.common.js",
      "webpack.dev.js",
      "webpack.prod.js",
    ],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      sourceType: "commonjs",
    },
    name: "CJS config files",
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
]);
