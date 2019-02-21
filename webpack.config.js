const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ServiceWorkerPlugin = require('serviceworker-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const autoprefixer = require('autoprefixer');
const path = require('path');

module.exports = (env, { mode = 'development' }) => ({
  mode,

  devtool: mode === 'production' ? 'source-map' : 'eval-source-map',

  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:6].js'
  },

  node: false,

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|api)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.css/,
        use: [
          'vue-style-loader',
          'css-loader',
          { loader: 'postcss-loader', options: { plugins: [autoprefixer] } },
          'sass-loader'
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, 'src')
    }
  },

  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'static', 'index.html')
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'static'),
        to: path.resolve(__dirname, 'dist'),
        toType: 'dir'
      }
    ]),
    new ServiceWorkerPlugin({
      entry: path.join(__dirname, 'src/sw.js'),
      exclude: ['**/.*', '**/*.map', '**/*.hot-update.json']
    })
  ].concat(
    mode === 'production'
      ? [new CleanWebpackPlugin(['dist'], { verbose: false })]
      : []
  ),

  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: {
      name: entrypoint => `runtime~${entrypoint.name}`
    },
    mangleWasmImports: true,
    removeAvailableModules: true,
    removeEmptyChunks: true,
    mergeDuplicateChunks: true
  },

  devServer: {
    compress: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    open: true,
    port: 3000,
    clientLogLevel: 'none',
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
});
