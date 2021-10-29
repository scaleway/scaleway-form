const path = require('path')

module.exports = {
  core: {
    builder: 'webpack5',
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  stories: ['../src/**/__stories__/*.stories.tsx', '../src/__stories__/**'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
  ],
  webpackFinal: config => {
    const cwd = process.cwd()

    config.resolve.alias = {
      ...config.resolve.alias,
      '@emotion/core': path.join(cwd, 'node_modules', '@emotion', 'react'),
      '@emotion/styled': path.join(cwd, 'node_modules', '@emotion', 'styled'),
      '@emotion/styled-base': path.join(
        cwd,
        'node_modules',
        '@emotion',
        'styled',
      ),
      'emotion-theming': path.join(cwd, 'node_modules', '@emotion', 'react'),
    }

    return config
  },
}
