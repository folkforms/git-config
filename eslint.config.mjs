import globals from "globals";
import pluginJs from "@eslint/js";
import jest from "eslint-plugin-jest";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.browser,
        ...globals.jest,
      },
    },
    rules: {
      ...jest.configs.recommended.rules,
    },
    plugins: {
      ...pluginJs.configs.recommended,
      jest,
    },
    ignores: ["yarn.lock"],
  },
];
