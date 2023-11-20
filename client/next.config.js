module.exports = {
    webpack: (config, { dev }) => {
      // Watch options for development
      if (dev) {
        config.watchOptions.poll = 300;
      }
  
      return config;
    }
  };
  