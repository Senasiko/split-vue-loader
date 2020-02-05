const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { SplitVuePlugin } = require('../dist/plugin');
module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './main.ts'),
  resolve: {
    extensions: ['.ts', '.js', '.tsx'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    stats: "minimal",
    hot: false,
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /(?<!_vue)\.ts$/,
        loader: 'ts-loader',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new SplitVuePlugin(),
    new HtmlWebpackPlugin()
  ]
}
