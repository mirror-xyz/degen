import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  globals: {
    'ts-jest': {
      babelConfig: {
        plugins: ['@vanilla-extract/babel-plugin'],
      },
    },
  },
  moduleNameMapper: {
    '~/(.*)$': '<rootDir>/src/$1',
    '@/(.*)$': '<rootDir>/$1',
    '\\.svg': '<rootDir>/test/__mocks__/svgrMock.js',
    '\\.(gif|ttf|eot|png)$': '<rootDir>/test/__mocks__/file.js',
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
