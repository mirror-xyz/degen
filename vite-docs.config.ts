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

          if (process.env.NODE_ENV) {
            // show all component demos during dev
            // put them in page `/components/demos/${componentName}`
            helpers.watchFiles(
              srcPath,
              '**/demos/**/*.{[tj]sx,md?(x)}',
              async (file, api) => {
                const { relative, path: absolute } = file
                const match = relative.match(
                  /(.*)\/demos\/(.*)\.([tj]sx|mdx?)$/,
                )
                if (!match) throw new Error('unexpected file: ' + absolute)
                const [, componentName, demoName] = match
                const pageId = `/components/demos/${componentName}`
                // set page data
                const runtimeDataPaths = api.getRuntimeData(pageId)
                // the ?demo query will wrap the module with useful demoInfo
                runtimeDataPaths[demoName] = `${absolute}?demo`
              },
            )
          }

          // find all component README
          helpers.watchFiles(srcPath, '**/README.md?(x)', async (file, api) => {
            const { relative, path: absolute } = file
            const match = relative.match(/(.*)\/README\.mdx?$/)
            if (!match) throw new Error('unexpected file: ' + absolute)
            const [, componentName] = match
            const pageId = `/${componentName}`
            // set page data
            const runtimeDataPaths = api.getRuntimeData(pageId)
            runtimeDataPaths.main = absolute
            // set page staticData
            const staticData = api.getStaticData(pageId)
            staticData.main = await helpers.extractStaticData(file)
          })
        },
      }),
    }),
  ],
})
