const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'main.[hash:6].js'
  },

  resolve: {
    extensions: ['.js', '.json', '.vue'],
    modules: [
      path.join(__dirname, 'node_modules')
    ],
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },

  module: {
    rules: [
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
              plugins: [
                autoprefixer()
              ]
            }
          },
          'sass-loader'
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['build']),

    new CopyWebpackPlugin([
      {
        from: 'src/static',
        to: 'static'
      }
    ]),

    new HtmlWebpackPlugin({
      inject: false,
      template: require('html-webpack-template'),

      appMountId: 'app',
      mobile: true,
      lang: 'en-US'
    }),

    new VueLoaderPlugin()
  ],

  devServer: {
    historyApiFallback: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}