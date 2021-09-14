import * as Exports from './'

const icons = ['IconBookOpen']

it('should expose correct exports', () => {
  expect(Object.keys(Exports)).toEqual([
    // components
    'Box',
    'Button',
    ...icons,
    'Skeleton',
    'SkeletonGroup',
    'Spinner',
    'Stack',
    'Text',
    'VisuallyHidden',
    // theme
    'ThemeProvider',
    'useTheme',
  ])
})
