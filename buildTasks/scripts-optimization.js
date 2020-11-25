const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
    },
  ],
  plugins: [],
  minimizer: [
    new TerserPlugin({
      terserOptions: {
        output: {
          comments: false,
        },
      },
    }),
  ],
};

// for later reference:
// terserOptions: {
//   extractComments: true,
//   ecma: undefined,
//   warnings: false,
//   parse: {},
//   compress: {},
//   mangle: true,
//   module: false,
//   output: {
//     comments: true,
//   },
//   toplevel: false,
//   nameCache: null,
// },
