import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import configPrettier from "eslint-config-prettier";
import eslint from "@eslint/js";
import react from "eslint-plugin-react";
import jsxA11Y from "eslint-plugin-jsx-a11y";
import calmReactIntl from "@calm/eslint-plugin-react-intl";
import pluginReactHooks from "eslint-plugin-react-hooks";

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
          noTrailingWhitespace: true,
          noSpreadOperator: false,
          requireDescription: false,
          formatDefineMessages: true,
          requireDefaultMessage: true,
          requireIdAsString: true,
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
]);
