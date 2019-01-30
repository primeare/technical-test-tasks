'use strict';

module.exports = {
  recurseDepth: 50,
  plugins: [
    'plugins/markdown',
  ],
  source: {
    include: ['components'],
    // excludePattern: '.+\\.api.js$',
  },
  opts: {
    destination: 'docs/code',
    template: 'node_modules/postman-jsdoc-theme',
    recurse: true,
    encoding: 'utf8',
    private: false,
    readme: 'README.md',
  },
  templates: {
    cleverLinks: true,
  },
  tags: {
    allowUnknownTags: true,
  },
};
