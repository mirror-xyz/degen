import * as Exports from './index'

it('should expose correct exports', () => {
  expect(Object.keys(Exports)).toEqual([
    'useTheme',
    'createVariants',
    'Box',
    'Text',
    'ThemeContext',
    'ThemeProvider',
    'VisuallyHidden',
  ])
})
