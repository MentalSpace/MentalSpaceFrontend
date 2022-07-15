const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  // Customize the config before returning it.
  if (config.mode === 'development') {
    config.devServer.proxy = {
      '/api/v0': {
        target: 'http://10.33.110.91:8039',
        secure: false,
        changeOrigin: true,
      },
    };
  }

  return config;
};
