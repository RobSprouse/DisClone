module.exports = {
     env: { browser: true, es2021: true },
     extends: [
          "eslint:recommended",
          "plugin:react/recommended",
          "plugin:react/jsx-runtime",
          "plugin:react-hooks/recommended",
          "plugin:jsx-a11y/recommended",
          "plugin:import/errors",
          "plugin:import/warnings",
          "plugin:react-perf/recommended",
          "prettier",
     ],
     parserOptions: { ecmaVersion: "latest", sourceType: "module" },
     settings: { react: { version: "detect" } },
     plugins: ["react-refresh"],
     rules: {
          "no-console": "off",
          "no-unused-vars": "warn",
          "react/prop-types": "warn",
          "react-hooks/rules-of-hooks": "error",
          "react/jsx-key": "warn",
          "no-empty": "warn",
          "prefer-const": "warn",
          "react-hooks/exhaustive-deps": "warn",
          "import/no-unresolved": "error",
          "import/named": "error",
          "import/default": "error",
          "import/namespace": "error",
          "import/no-named-as-default": "error",
          "import/no-named-as-default-member": "error",
          "import/no-deprecated": "warn",
          "react/jsx-filename-extension": ["warn", { extensions: [".jsx", ".js"] }],
          "react/jsx-pascal-case": "warn",
          "react/sort-comp": "warn",
     },
};
