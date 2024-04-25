import globals from "globals";
import pluginJs from "@eslint/js";
import jest from "eslint-plugin-jest";

export default [
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs" },
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
      },
    },
  },
  {
    rules: {
      ...jest.configs.recommended.rules,
    },
  },
  pluginJs.configs.recommended,
  {
    plugins: { jest },
  },
  {
    ignores: ["yarn.lock"],
  },
];
