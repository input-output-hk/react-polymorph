module.exports = {
  module: {
    rules: [
      {
        test: /\.(?:png|svg)$/,
        use: 'url-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: [/(node_modules)/, /react-css-themr/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [['env', { modules: false }], 'react'],
              plugins: [
                'transform-object-rest-spread',
                'transform-flow-strip-types',
                'transform-decorators-legacy',
                'transform-class-properties',
                'lodash'
              ]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader', options: { sourceMap: true } },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[name]_[local]',
              importLoaders: true
            }
          },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      }
    ]
  },
  devtool: 'source-map'
};
