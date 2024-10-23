const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    stream: require.resolve('stream-browserify'),
  };
  
  config.plugins = (config.plugins || []).concat(
    new webpack.ProvidePlugin({
      process: 'process/browser',
    })
  );

  return config;
};

