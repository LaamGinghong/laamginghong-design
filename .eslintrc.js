module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:react/recommended',
    'standard',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: '16.10',
    },
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'error',
  },
}
