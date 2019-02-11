const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackTemplate = require('html-webpack-template');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'main.[hash:6].js'
  },

  resolve: {
    extensions: ['.js', '.json', '.vue'],
    modules: [path.join(__dirname, 'node_modules')],
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(vue|js)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.s?css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer()]
            }
          },
          'sass-loader'
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['build']),

    new HtmlWebpackPlugin({
      inject: false,
      template: htmlWebpackTemplate,

      appMountId: 'app',
      mobile: true,
      lang: 'en-US'
    }),

    new VueLoaderPlugin()
  ],

  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 3000,
    clientLogLevel: 'none',
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};
