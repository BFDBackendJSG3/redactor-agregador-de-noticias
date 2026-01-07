import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import json from "@eslint/json";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier";

export default defineConfig([

  // Ignorar arquivos e pastas
  {
    ignores: [
      "node_modules/",
      "dist/",
      "build/",
      "package-lock.json",
      "**/*.css"     // 👈 ignora todos os CSS
    ]
  },

  // JS + JSX (React)
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js, react: pluginReact },
    extends: ["js/recommended", pluginReact.configs.flat.recommended],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
    settings: {
      react: { version: "detect" },
    },
  },

  // JSON lint – exceto package-lock que já está ignorado
  {
    files: ["**/*.json"],
    plugins: { json },
    language: "json/json",
    extends: ["json/recommended"],
  },

  // Prettier por último
  eslintConfigPrettier,
]);
