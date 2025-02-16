import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import reactPlugin from "eslint-plugin-react";
import globals from "globals";

export default [
  {
    ignores: [
      "dist",
      "node_modules",
      "build",
      "public",
      "yarn.lock",
      "pnpm-lock.yaml",
      "package-lock.json",
      ".env*",
      "*.config.cjs",
      "*.config.js",
    ],
  },
  eslint.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    ...reactPlugin.configs.flat.recommended,
    languageOptions: {
      ...reactPlugin.configs.flat.recommended.languageOptions,
      sourceType: "module",
      ecmaVersion: "latest",
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
        chrome: "readonly",
      },
    },
    rules: {
      ...reactPlugin.configs.flat.recommended.rules,
      "react/prop-types": "off",
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react/react-in-jsx-scope": "off", // Not needed for React 17+
      "no-undef": "error", // Catch missing imports
      "no-unused-vars": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  eslintConfigPrettier, // add after other configs that you want to override
];
