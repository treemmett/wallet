module.exports = {
  parserOptions: {
    sourceType: 'module',
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    'airbnb-base',
    'plugin:vue/recommended',
    'plugin:vue-a11y/base',
    'prettier',
    'prettier/vue',
  ],
  plugins: [
    'vue-a11y',
    'vue',
    'prettier'
  ],
  rules: {
    'no-param-reassign': 0,
    'no-underscore-dangle': [
      'error',
      {
        allow: ['__vue__']
      }
    ],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true
      }
    ],
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: false
      }
    ]
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: [
          '.js',
          '.vue'
        ]
      }
    }
  }
};