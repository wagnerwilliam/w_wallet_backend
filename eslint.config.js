import js from "@eslint/js";
import globals from "globals"; // 1. Importa la librería de globales

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      // 2. Define que tu entorno de ejecución es Node.js
      globals: globals.node,
    },
  },
  js.configs.recommended,
];
