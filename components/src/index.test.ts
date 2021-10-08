import { glob } from 'glob'

import path from 'path'

import * as Exports from './'

const svgComponentPaths = glob.sync('components/icons/Icon*', {
  cwd: __dirname,
  absolute: true,
})

const icons = svgComponentPaths.map((x) => path.basename(x))

it('should expose correct exports', () => {
  expect(Object.keys(Exports)).toEqual([
    // components
    'Badge',
    'Box',
    'Button',
    'Field',
    'Heading',
    ...icons,
    'Skeleton',
    'SkeletonGroup',
    'Spinner',
    'Stack',
    'Text',
    'TextInput',
    'ThemeProvider',
    'useTheme',
    'VisuallyHidden',
    // css
    'atoms',
    'vars',
  ])
})
