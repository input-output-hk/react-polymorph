const findCacheDir = require('find-cache-dir');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.(?:png|svg)$/,
        loader: 'url-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: [/(node_modules)/, /react-css-themr/],
        loader: require.resolve('babel-loader'),
        query: {
          babelrc: false,
          cacheDirectory: findCacheDir({ name: 'react-storybook' }),
          presets: ['env', 'react'],
          plugins: [
            'transform-flow-strip-types',
            'transform-decorators-legacy',
            'transform-class-properties',
            'lodash',
          ],
        },
      }, {
        test: /\.scss$/,
        loaders: [
          'style-loader?sourceMap',
          'css-loader?sourceMap&modules&localIdentName=[name]_[local]&importLoaders=1',
          'sass-loader?sourceMap',
        ]
      }
    ]
  }
};
