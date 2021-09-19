import { defineConfig } from 'vite'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import tsconfigPaths from 'vite-tsconfig-paths'
import reactRefresh from '@vitejs/plugin-react-refresh'
import mdx from 'vite-plugin-mdx'
import pages, { DefaultPageStrategy } from 'vite-plugin-react-pages'

import * as path from 'path'

export default defineConfig({
  build: {
    outDir: 'site',
  },
  plugins: [
    vanillaExtractPlugin(),
    tsconfigPaths(),
    reactRefresh(),
    mdx(),
    pages({
      pagesDir: path.join(__dirname, 'docs'),
      pageStrategy: new DefaultPageStrategy({
        extraFindPages: async (_pagesDir, helpers) => {
          const srcPath = path.join(__dirname, 'src')
          // Find all component docs
          helpers.watchFiles(srcPath, '**/*docs.md?(x)', async (file, api) => {
            const { relative, path: absolute } = file
            const match = relative.match(/(.*)\/(?:.*)\.docs\.mdx?$/)
            if (!match) throw new Error('Unexpected file: ' + absolute)

            const [, componentName] = match
            const pageId = `/${componentName}`

            const runtimeDataPaths = api.getRuntimeData(pageId)
            runtimeDataPaths.main = absolute

            const staticData = api.getStaticData(pageId)
            staticData.main = await helpers.extractStaticData(file)
          })
        },
      }),
    }),
  ],
})
