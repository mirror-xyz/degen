import { sync } from 'glob'

import path from 'path'

import * as Exports from './'

const svgComponentPaths = sync('components/icons/Icon*', {
  cwd: __dirname,
  absolute: true,
})

const icons = svgComponentPaths.map((x) => path.basename(x))

it('should expose correct exports', () => {
  expect(Object.keys(Exports)).toEqual([
    // components
    'Box',
    'Button',
    'Heading',
    ...icons,
    'Skeleton',
    'SkeletonGroup',
    'Spinner',
    'Stack',
    'Text',
    'ThemeProvider',
    'useTheme',
    'VisuallyHidden',
  ])
})
