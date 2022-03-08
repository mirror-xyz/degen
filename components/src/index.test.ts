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
    'Avatar',
    'AvatarGroup',
    'Box',
    'Button',
    'Card',
    'Field',
    'FieldSet',
    'FileInput',
    'Heading',
    'IconNFT',
    'MediaPicker',
    'Range',
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
    'breakpoints',
    'getAccentText',
    'mapResponsiveValue',
    'motionSafe',
    'normalizeResponsiveValue',
    'responsiveStyle',
    'vars',
    // generated icons
    ...generatedIcons,
  ])
})
