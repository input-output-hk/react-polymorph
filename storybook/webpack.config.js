module.exports = {
  module: {
    rules: [
      {
        test: /\.(?:png|svg)$/,
        use: 'url-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: [/(node_modules)/, /react-css-themr/],
        use: [{
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              ['env', { "modules": false }],
              'react'
            ],
            plugins: [
              'transform-flow-strip-types',
              'transform-decorators-legacy',
              'transform-class-properties',
              'lodash',
            ],
          }
        }],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader?sourceMap',
          'css-loader?sourceMap&modules&localIdentName=[name]_[local]&importLoaders=1',
          'sass-loader?sourceMap',
        ]
      }
    ]
  },
  devtool: 'source-map'
};
