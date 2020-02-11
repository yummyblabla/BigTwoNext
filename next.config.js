const withSass = require('@zeit/next-sass');
const withImages = require('next-images');

module.exports = withImages(withSass({
  devIndicators: {
    autoPrerender: false,
  },
  env: {
    socketUrl: 'https://api.bigtwo.io',
    // socketUrl: 'http://localhost:8000',
  },
}));
