module.exports = {
     env: {
          node: true,
          es2021: true,
     },
     extends: ["eslint:recommended", "plugin:node/recommended", "prettier"],
     parserOptions: {
          ecmaVersion: 12,
          sourceType: "module",
     },
     globals: {
          "process.env": "readonly",
     },
     rules: {
          "no-console": "off",
          "no-unused-vars": "warn",
          "prefer-const": "warn",
          "no-empty": "warn",
          "node/no-unpublished-require": "warn",
          "node/no-missing-require": "error",
          "node/no-extraneous-require": "error",
          "node/no-unsupported-features/es-syntax": "off",
     },
};
