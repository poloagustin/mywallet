var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  entry: [
    `bootstrap-loader/lib/bootstrap.loader?extractStyles&configFilePath=${__dirname}/.bootstraprc!bootstrap-loader/no-op.js`,
    'font-awesome-loader',
    'tether',
    './src/index.js'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My Wallet'
    })
  ],
  module: {
    rules: [{
      test: /\.css$/,
      exclude: /node_modules/,
      use: ExtractTextPlugin.extract({
        loader: 'css-loader',
        options: {
          sourceMap: true
        }
      })
    }]
  },
  devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin({ filename: 'bundle.css', disable: false, allChunks: true }),
    new webpack.ProvidePlugin({
      "window.Tether": "tether"
    }),
  ]
};
