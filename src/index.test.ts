import * as Exports from './'

it('should expose correct exports', () => {
  expect(Object.keys(Exports)).toEqual([
    // components
    'Box',
    // theme
    'useTheme',
    'ThemeContext',
    'ThemeProvider',
  ])
})
