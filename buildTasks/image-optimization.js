const ImageminPlugin = require('imagemin-webpack-plugin').default;

const imageOptimizationConfig = {
  rules: [
    // can be used later for loading some images assets in profile bg and dashboard
    // {
    //   test: /\.(jpe?g|png|gif|svg)$/,
    //   use: [
    //     {
    //       loader: 'file-loader',
    //       options: {
    //         outputPath: 'images',
    //       },
    //     },
    //   ],
    // },
    {
      test: /\.(png|svg|jpg|gif|jpeg)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            // limit: 8192,
          },
        },
      ],
    },
    {
      test: /\.(jpe?g|png|gif|svg)$/,
      loader: 'image-webpack-loader',
      enforce: 'pre', // This will apply the loader before the other ones
      options: {
        optipng: {
          enabled: true,
        },
      },
    },
  ],
  plugins: [
    new ImageminPlugin({
      disable: process.env.NODE_ENV !== 'production',
      pngquant: {
        quality: '99',
      },
    }),
  ],
};

module.exports = imageOptimizationConfig;
