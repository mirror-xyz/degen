import * as Exports from './'

it('should expose correct exports', () => {
  expect(Object.keys(Exports)).toEqual([
    // components
    'Box',
    'Button',
    'Spinner',
    'Text',
    'VisuallyHidden',
    // theme
    'useTheme',
    'ThemeContext',
    'ThemeProvider',
  ])
})
