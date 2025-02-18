import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
  {
    ignores: [
      "dist",
      // "node_modules",
      // "build",
      // "public",
      // "yarn.lock",
      // "pnpm-lock.yaml",
      // "package-lock.json",
      // ".env*",
      // "*.config.cjs",
      // "*.config.js",
    ],
  },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.serviceworker,
        chrome: "readonly",
      },
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    rules: {
      ...eslint.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react/prop-types": "off",
      "react/jsx-no-target-blank": "off",
      // "react/jsx-uses-react": "error",
      // "react/jsx-uses-vars": "error",
      // "react/react-in-jsx-scope": "off", // Not needed for React 17+
      // "no-undef": "error", // Catch missing imports
      // "no-unused-vars": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  eslintConfigPrettier, // add after other configs that you want to override
];
