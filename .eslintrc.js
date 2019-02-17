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
    'prettier',
    'prettier/vue'
  ],
  plugins: ['vue', 'prettier'],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['webpack.*.js']
      }
    ],
    'no-param-reassign': 0,
    'no-underscore-dangle': [
      'error',
      {
        allow: ['__vue__']
      }
    ],
    'prettier/prettier': 'error',
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
        extensions: ['.js', '.vue']
      }
    }
  }
};
