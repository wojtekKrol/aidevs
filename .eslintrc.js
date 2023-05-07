module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'prettier/prettier': 'error',
    quotes: [2, 'single'],
    semi: [2, 'never'],
    'no-var': 'error',
    'no-unused-vars': 'off',
    'no-undef': 'error',
    'no-trailing-spaces': 'error',
    indent: ['error', 2],
    'max-len': ['warn', { code: 80 }],
  },
}
