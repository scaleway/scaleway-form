const path = require('path')

module.exports = {
  core: {
    builder: 'webpack5',
  },
  features: {
    // storyStoreV7: true,
    previewMdx2: true,
  },
  tsDocgenLoaderOptions: {
    tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
  },
  features: {
    previewMdx2: true,
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  stories: [
    '../src/__stories__/Introduction.stories.mdx',
    '../src/**/__stories__/*.stories.tsx',
    '../src/__stories__/**',
  ],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
  ],
  // webpackFinal: (config: any) => {
  //   const cwd = process.cwd()

  //   if (config.resolve?.alias) {
  //     config.resolve.alias = {
  //       ...config.resolve.alias,
  //       '@emotion/core': path.join(cwd, 'node_modules', '@emotion', 'react'),
  //       '@emotion/styled': path.join(cwd, 'node_modules', '@emotion', 'styled'),
  //       '@emotion/styled-base': path.join(
  //         cwd,
  //         'node_modules',
  //         '@emotion',
  //         'styled',
  //       ),
  //       'emotion-theming': path.join(cwd, 'node_modules', '@emotion', 'react'),
  //     }
  //   }

  // if (config.module?.rules) {
  //   config.module.rules.push({
  //     test: /\.(png)$/,
  //     use: [
  //       {
  //         loader: 'file-loader',
  //       },
  //     ],
  //   })
  // }

  //   return config
  // },
}
