const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  loaders: [],
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: true,
      template: path.resolve(__dirname, '../src', 'index.html'),
    }),
  ],
};
