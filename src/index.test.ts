import * as Exports from './'

it('should expose correct exports', () => {
  expect(Object.keys(Exports)).toEqual([
    'Box',
    'Button',
    'Spinner',
    'Text',
    'VisuallyHidden',
    'ThemeProvider',
    'useTheme',
  ])
})
