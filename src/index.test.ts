import * as Exports from './index'

it('should expose correct exports', () => {
  expect(Object.keys(Exports)).toEqual([
    'Box',
    'Button',
    'Spinner',
    'ThemeContext',
    'ThemeProvider',
    'Text',
    'VisuallyHidden',
  ])
})
