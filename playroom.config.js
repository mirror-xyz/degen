const path = require('path')

module.exports = {
  components: './src/playroom/components.ts',
  outputPath: './site/playroom',
  title: 'Mirror',
  snippets: './src/playroom/snippets.ts',
  themes: './src/playroom/themes.ts',
  frameComponent: './src/playroom/frame-component.tsx',
  scope: './src/playroom/use-scope.ts',
  typeScriptFiles: ['src/**/*.{ts,tsx}', '!**/node_modules'],
  widths: [320, 768, 1024, 1400],
  openBrowser: false,
  port: 8082,

  webpackConfig: () => ({
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-typescript',
                '@babel/preset-react',
              ],
            },
          },
        },
      ],
    },
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src'),
      },
      extensions: ['.js', '.ts', '.tsx'],
    },
  }),
}
