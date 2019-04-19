module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
    '@vue/typescript',
    'plugin:prettier/recommended',
    'prettier/vue'
  ],
  rules: {
    'class-methods-use-this': 'off',
    'comma-dangle': ['error', 'never'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prettier/prettier': [
      'error',
      {
        htmlWhitespaceSensitivity: 'ignore',
        singleQuote: true
      }
    ]
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
};
