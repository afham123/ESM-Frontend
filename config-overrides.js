const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    stream: require.resolve('stream-browserify'),
    process: require.resolve('process/browser')
  };
  
  config.plugins = (config.plugins || []).concat(
    new webpack.ProvidePlugin({
      process: 'process/browser',
    })
  );

  return config;
};

