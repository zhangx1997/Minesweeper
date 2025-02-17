const path = require('path');

module.exports = function override(config, env) {
  // Override output directory to dist
  if (env === 'production') {
    config.output.path = path.resolve(__dirname, 'dist');
  }
  return config;
};
