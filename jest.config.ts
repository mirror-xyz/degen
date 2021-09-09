import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  moduleNameMapper: {
    '~/(.*)$': '<rootDir>/src/$1',
    '@/(.*)$': '<rootDir>/$1',
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
