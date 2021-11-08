import { glob } from 'glob'

import path from 'path'

import * as Exports from './'

const generatedIconPaths = glob.sync('components/icons/generated/Icon*/', {
  cwd: __dirname,
  absolute: true,
})

const generatedIcons = generatedIconPaths.map((x) => path.basename(x))

it('should expose correct exports', () => {
  expect(Object.keys(Exports)).toEqual([
    // components
    'Box',
    'Button',
    'Card',
    'Field',
    'Heading',
    'IconNFT',
    'Skeleton',
    'SkeletonGroup',
    'Spinner',
    'Stack',
    'Stat',
    'Tag',
    'Text',
    'Textarea',
    'Input',
    'ThemeProvider',
    'useTheme',
    'VisuallyHidden',
    // css
    'atoms',
    'vars',
    // generated icons
    ...generatedIcons,
  ])
})
