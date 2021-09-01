import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import dts from 'vite-plugin-dts'

import pkg from './package.json'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      fileName: 'index',
      formats: ['cjs', 'es'],
    },
    rollupOptions: {
      external: [
        ...Object.keys(pkg.dependencies ?? {}),
        ...Object.keys(pkg.devDependencies ?? {}),
      ],
    },
  },
  plugins: [
    vanillaExtractPlugin(),
    reactRefresh(),
    dts({
      exclude: ['src/**test.ts*'],
      beforeWriteFile: (filePath, content) => ({
        content,
        filePath: filePath.replace('src', ''),
      }),
      compilerOptions: {
        emitDeclarationOnly: true,
        noEmit: false,
      },
      outputDir: 'dist/types',
    }),
  ],
})
