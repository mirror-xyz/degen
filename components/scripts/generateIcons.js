const fs = require('fs-extra')
const glob = require('glob')
const { default: svgr } = require('@svgr/core')
const dedent = require('dedent')
const { pascalCase } = require('change-case')

const path = require('path')

const componentTemplate = ({ template }, opts, { componentName, jsx }) => {
  const code = `
    import * as React from 'react'
    NEWLINE
    import { IconProps } from '../types'
    NEWLINE
    export const COMPONENT_NAME = ({ title, titleId, ...props }: IconProps) => COMPONENT_JSX
  `

  const reactTemplate = template.smart(code, {
    plugins: ['react', 'typescript'],
  })

  return reactTemplate({
    COMPONENT_NAME: componentName,
    COMPONENT_JSX: jsx,
    NEWLINE: '\n',
  })
}

const svgrConfig = {
  plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
  replaceAttrValues: { '#000': 'currentColor' },
  svgProps: {
    focusable: 'false',
    shapeRendering: 'geometricPrecision',
    viewBox: '0 0 24 24',
  },
  svgoConfig: {
    multipass: true,
  },
  template: componentTemplate,
  titleProp: true,
}

const baseDir = path.join(__dirname, '..')
const iconComponentsDir = path.join(baseDir, 'src/components/icons')

;(async () => {
  // Clean old files
  const svgComponentPaths = glob.sync('Icon*', {
    cwd: iconComponentsDir,
    absolute: true,
  })
  console.log('Cleaning old icons...')
  for (const svgComponentPath of svgComponentPaths) {
    await fs.remove(svgComponentPath)
  }

  // Get SVGs to generate
  const svgFilePaths = glob.sync('../icons/*.svg', {
    cwd: baseDir,
    absolute: true,
  })

  console.log('Generating icons...')
  for (const svgFilePath of svgFilePaths) {
    const rawSvg = await fs.readFile(svgFilePath, 'utf8')
    const svg = rawSvg.replace(/ data-name=".*?"/g, '')
    const svgName = `Icon${pascalCase(path.basename(svgFilePath, '.svg'))}`

    // Create icon directory if it's missing
    const iconDir = path.join(iconComponentsDir, svgName)
    await fs.mkdirp(iconDir)

    // Write SVG React component
    const componentName = `${svgName}Svg`
    const svgComponentCode = svgr.sync(svg, svgrConfig, { componentName })
    await fs.writeFile(
      path.join(iconDir, `${componentName}.tsx`),
      svgComponentCode,
      { encoding: 'utf-8' },
    )

    // Write wrapper component
    await fs.writeFile(
      path.join(iconDir, `${svgName}.tsx`),
      dedent`
          import * as React from 'react'

          import { Atoms } from '~/theme'
          import { Box } from '../../Box'
          import { OptionalTitle } from '../types'
          import { ${componentName} } from './${componentName}'

          type BoxProps = Parameters<typeof Box>[0]

          type Props = Pick<BoxProps, 'className'> & {
            size?: Atoms['size']
            tone?: Atoms['color']
          } & OptionalTitle

          export const ${svgName} = ({ size = '6', tone, ...props }: Props) => {
            return (
              <Box
                as={${componentName}}
                color={tone}
                height={size}
                width={size}
                {...props}
              />
            )
          }
        `,
      'utf-8',
    )

    // Write index file
    await fs.writeFile(
      path.join(iconDir, `index.ts`),
      dedent`
          export { ${svgName} } from './${svgName}'
        `,
      'utf-8',
    )
  }

  // Create icons/index.ts
  const iconComponentNames = (await fs.readdir(iconComponentsDir)).filter(
    (fileOrDir) => !fileOrDir.includes('.') && fileOrDir.includes('Icon'),
  )
  const iconExports = iconComponentNames
    .map((componentFile) => path.basename(componentFile, '.tsx'))
    .map((component) => `export { ${component} } from './${component}'`)
    .join('\n')
    .concat('\n')
  const iconsIndexPath = path.join(iconComponentsDir, 'index.ts')
  await fs.remove(iconsIndexPath)
  console.log('Generating icon index...')
  await fs.writeFile(iconsIndexPath, iconExports, 'utf-8')
  console.log('Done.')
})()
