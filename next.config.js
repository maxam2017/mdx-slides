const withPWA = require('next-pwa');

module.exports = withPWA({
  pwa: {
    dest: 'public',
    mode: 'production',
    disable: process.env.NODE_ENV === 'development',
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.mdx$/,
      use: [
        options.defaultLoaders.babel,
        { loader: require.resolve('@mdx-js/loader') },
      ],
    });

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
});
