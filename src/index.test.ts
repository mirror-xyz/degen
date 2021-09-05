import * as Exports from './index'

it('should expose correct exports', () => {
  expect(Object.keys(Exports)).toEqual([
    'Box',
    'createVariants',
    'Text',
    'useTheme',
    'ThemeProvider',
    'VisuallyHidden',
  ])
})
