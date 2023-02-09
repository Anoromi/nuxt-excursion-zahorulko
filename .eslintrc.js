
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
  parser: 'vue-eslint-parser',
  // parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    parser: "@typescript-eslint/parser"
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    'no-undef': 0,
    'vue/multi-word-component-names': 0,
    'no-implicit-coercion': 2,
    eqeqeq: 2,
    'prefer-const': 1,
    'no-console': 1,
    '@typescript-eslint/strict-boolean-expressions': [
      2,
      {
        allowNullableObject: false,
        allowString: false,
        allowNumber: false,
        allowNullableBoolean: false
        // allowNullableBoolean: true,
        // allowNullableString: true,
        // allowNullableNumber: true,
      },
    ],
  },
}
