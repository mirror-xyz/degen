import { defineConfig } from 'vite'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import dts from 'vite-plugin-dts'

import { compilerOptions } from './tsconfig.json'
import pkg from './package.json'
import { resolve } from 'path'

const alias = Object.entries(compilerOptions.paths).reduce(
  (acc, [key, [value]]) => {
    const aliasKey = key.substring(0, key.length - 2)
    const path = value.substring(0, value.length - 2)
    return {
      ...acc,
      [aliasKey]: resolve(__dirname, path),
    }
  },
  {},
)

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
    dts({
      exclude: ['src/**test.ts*', 'src/playroom/**', 'src/styles/**'],
      beforeWriteFile: (filePath, content) => ({
        content,
        filePath: filePath.replace('src', ''),
      }),
      compilerOptions: {
        baseUrl: './src/',
        emitDeclarationOnly: true,
        noEmit: false,
      },
      outputDir: 'dist/types',
    }),
  ],
  resolve: {
    alias,
  },
})
