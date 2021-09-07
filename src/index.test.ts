import * as Exports from './index'

it('should expose correct exports', () => {
  expect(Object.keys(Exports)).toEqual([
    'useTheme',
    'vars',
    'Box',
    'Button',
    'Spinner',
    'ThemeContext',
    'ThemeProvider',
    'Text',
    'VisuallyHidden',
  ])
})
