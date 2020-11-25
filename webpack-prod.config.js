const path = require('path');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

var cssConfig = require('./buildTasks/css-optimization.js');
var imageOptimizationConfig = require('./buildTasks/image-optimization.js');
var htmlOptimizationConfig = require('./buildTasks/html-optimization.js');
var fontOptimizationConfig = require('./buildTasks/fonts-optimization.js');
var scriptsOptimizationConfig = require('./buildTasks/scripts-optimization.js');

module.exports = {
  mode: 'production',
  devServer: {
    port: 4300,
    open: true,
    contentBase: './public',
    publicPath: '/',
    historyApiFallback: true,
  },
  context: __dirname,
  entry: './src/index',
  externals: {
    config: JSON.stringify({
      apiUrl: 'http://localhost:5000',
    }),
  },
  module: {
    rules: [...scriptsOptimizationConfig.rules, ...cssConfig.rules, ...imageOptimizationConfig.rules, ...fontOptimizationConfig.rules],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      '@fonts-exporter': path.join(__dirname + '/src/fonts'),
      '@components': path.join(__dirname + '/src/components'),
    },
  },
  output: {
    publicPath: '/',
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    ...scriptsOptimizationConfig.plugins,
    ...cssConfig.plugins,
    ...imageOptimizationConfig.plugins,
    ...htmlOptimizationConfig.plugins,
    new CompressionPlugin(),
    new CopyWebpackPlugin({
      patterns: [{from: 'public/_redirects', to: path.resolve(__dirname, 'dist/')}],
    }),
    // new BundleAnalyzerPlugin(),
  ],
  performance: {
    maxEntrypointSize: 100000,
    hints: 'warning',
  },
  optimization: {
    nodeEnv: 'production',
    splitChunks: {chunks: 'all'},
    minimize: true,
    minimizer: [...cssConfig.minimizer, ...scriptsOptimizationConfig.minimizer],
  },
};
