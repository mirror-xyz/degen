import type { Config } from '@jest/types'

import { pathsToModuleNameMapper } from 'ts-jest/utils'

import { compilerOptions } from './tsconfig.base.json'

const config: Config.InitialOptions = {
  globals: {
    'ts-jest': {
      babelConfig: {
        plugins: ['@vanilla-extract/babel-plugin'],
      },
    },
  },
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/file.js',
  },
  preset: 'ts-jest',
  roots: ['<rootDir>'],
  testEnvironment: 'jsdom',
  testRegex: '.*\\.test\\.(ts|tsx)$',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}

export default config
