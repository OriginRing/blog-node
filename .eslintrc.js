module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['standard'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    indent: 'off',
    'no-console': 'error',
    'linebreak-style': ['error', 'unix'],
    semi: ['error', 'always'],
    'space-before-function-paren': 'off',
    'new-cap': 'off'
  }
};
