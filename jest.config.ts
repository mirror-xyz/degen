import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
  },
  testEnvironment: 'jsdom',
  testRegex: '.*\\.test\\.(ts|tsx)$',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}

export default config
