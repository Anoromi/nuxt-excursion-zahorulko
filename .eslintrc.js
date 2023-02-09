// import * as tsParser from '@typescript-eslint/parser'
// import * as espree from 'espree'

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    // 'plugin:@typescript-eslint/recommended',
    '@vue/eslint-config-typescript',
  ],
  overrides: [],
  // parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    'no-undef': 0,
    'vue/multi-word-component-names': 0,
    'no-implicit-coercion': 2,
    'eqeqeq': 2,
    'prefer-const': 1,
    'no-console': 1
  },
}
