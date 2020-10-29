module.exports = {
  root: true,
  env: {
    node: true,
  },
  "extends": "airbnb-base",
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": "off",
    "no-debugger": "off",
    quotes: [2, "double"],
  },
};
