const { vanillaExtractPlugin } = require('@vanilla-extract/vite-plugin')
const { default: tsconfigPaths } = require('vite-tsconfig-paths')

module.exports = {
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        docs: false,
      },
    },
    '@storybook/addon-a11y',
    'storybook-dark-mode',
  ],
  stories: ['../src/**/*.stories.@(tsx|mdx)'],
  viteFinal: async (config) => {
    config.plugins.push(vanillaExtractPlugin(), tsconfigPaths())
    return config
  },
  core: {
    builder: 'storybook-builder-vite',
  },
}
