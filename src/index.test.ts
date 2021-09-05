import * as Exports from './index'

it('should expose correct exports', () => {
  expect(Object.keys(Exports)).toEqual([
    'Box',
    'Text',
    'ThemeProvider',
    'VisuallyHidden',
    'createVariants',
  ])
})
