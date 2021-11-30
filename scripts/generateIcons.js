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
    import { IconProps } from '../../types'
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
  jsx: {
    babelConfig: {
      plugins: [
        [
          '@svgr/babel-plugin-remove-jsx-attribute',
          {
            elements: ['path'],
            attributes: ['className', 'strokeWidth'],
          },
        ],
      ],
    },
  },
}

const baseDir = path.join(__dirname, '..')
const iconComponentsDir = path.join(
  baseDir,
  'components/src/components/icons/generated',
)

;(async () => {
  // Clean old files
  const svgComponentPaths = glob.sync('Icon*/', {
    cwd: iconComponentsDir,
    absolute: true,
  })
  console.log('Cleaning old icons...')
  for (const svgComponentPath of svgComponentPaths) {
    await fs.remove(svgComponentPath)
  }

  // Get SVGs to generate
  const svgFilePaths = glob.sync('./icons/*.svg', {
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

          import { Box, BoxProps } from '../../../Box'
          import { OptionalTitle } from '../../types'
          import { ${componentName} } from './${componentName}'

          type Props = {
            className?: BoxProps['className']
            color?: BoxProps['color']
            size?: BoxProps['height']
            strokeWidth?: BoxProps['strokeWidth']
          } & OptionalTitle

          export const ${svgName} = ({
            color,
            size = '6',
            strokeWidth = '0.5',
            ...props
          }: Props) => {
            return (
              <Box
                as={${componentName}}
                color={color}
                height={size}
                strokeWidth={strokeWidth}
                width={size}
                {...props}
              />
            )
          }
        `,
      'utf-8',
    )

    // Write docs file
    await fs.writeFile(
      path.join(iconDir, `${svgName}.docs.mdx`),
      dedent`
          ---
          title: ${svgName}
          ---

          \`\`\`tsx
          import { ${svgName} } from 'degen'
          \`\`\`

          \`\`\`tsx live=true expand=true
          <${svgName} />
          \`\`\`

          ## Props

          <PropsTable sourceLink={sourceLink} types={types} />
        `,
      'utf-8',
    )

    // Write snippets file
    await fs.writeFile(
      path.join(iconDir, `${svgName}.snippets.tsx`),
      dedent`
          import * as React from 'react'

          import { Snippet } from '!/playroom/src/types'
          import { ${svgName} } from './${svgName}'

          export const snippets: Snippet[] = [
            {
              name: 'Basic',
              code: <${svgName} />,
            },
          ] 
        `,
      'utf-8',
    )

    // Write index file
    await fs.writeFile(
      path.join(iconDir, 'index.ts'),
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
