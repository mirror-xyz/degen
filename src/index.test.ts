import * as Exports from './'

it('should expose correct exports', () => {
  expect(Object.keys(Exports)).toEqual([
    'Box',
    'Button',
    'Spinner',
    'Stack',
    'Text',
    'VisuallyHidden',
    'ThemeProvider',
    'useTheme',
  ])
})
