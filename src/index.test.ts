import * as Exports from './index'

it('should expose correct exports', () => {
  expect(Object.keys(Exports)).toEqual([
    'useTheme',
    'Box',
    'Button',
    'Spinner',
    'ThemeContext',
    'ThemeProvider',
    'Text',
    'VisuallyHidden',
  ])
})
