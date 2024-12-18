// const webpack = require('webpack');

// export function override(config) {
//   console.log('Before override:',config)
//   // Ensure fallbacks for process and stream
//   config.resolve.fallback = {
//     ...config.resolve.fallback,
//     'process/browser': require.resolve('process/browser'),
//     process: require.resolve('process/browser'), // This line resolves 'process'
//     stream: require.resolve('stream-browserify'), // This line resolves 'stream'
//   };

//   // Use ProvidePlugin to define global variables
//   config.plugins = (config.plugins || []).concat(
//     new webpack.ProvidePlugin({
//       process: 'process/browser',
//       Buffer: ['buffer', 'Buffer'], // Define Buffer globally
//     })
//   );
//   console.log('After override:',config)

//   return config;
// };


const webpack = require('webpack');

module.exports = {
  resolve: {
    fallback: {
      process: require.resolve("process/browser"),
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
};
