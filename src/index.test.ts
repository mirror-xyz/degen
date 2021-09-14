import * as Exports from './'

const icons = [
  'IconBookOpen',
  'IconChevronDown',
  'IconChevronRight',
  'IconLockClosed',
  'IconPlusSmall',
]

it('should expose correct exports', () => {
  expect(Object.keys(Exports)).toEqual([
    // theme
    'ThemeProvider',
    'useTheme',
    // components
    'Box',
    'Button',
    'Skeleton',
    'SkeletonGroup',
    'Spinner',
    'Stack',
    'Text',
    'VisuallyHidden',
    ...icons,
  ])
})
