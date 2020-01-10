module.exports = async ({ config, mode }) => {
  config.module.rules.push(
    {
      test: /\.jsx?$/,
      exclude: [/node_modules/],
      use: [
        {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-flow'
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              'lodash'
            ]
          }
        }
      ]
    },
    {
      test: /\.scss$/,
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            modules: {
              localIdentName: '[name]_[local]',
            },
            importLoaders: true
          }
        },
        { loader: 'sass-loader', options: { sourceMap: true } }
      ]
    }
  );
  return config;
};
