import * as Exports from './'

it('should expose correct exports', () => {
  expect(Object.keys(Exports)).toEqual([
    'Box',
    'Button',
    'Icons',
    'Skeleton',
    'SkeletonGroup',
    'Spinner',
    'Stack',
    'Text',
    'VisuallyHidden',
    'ThemeProvider',
    'useTheme',
  ])
})
