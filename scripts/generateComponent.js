const fs = require('fs-extra')
const dedent = require('dedent')
const prompt = require('prompt')

const path = require('path')

const baseDir = path.join(__dirname, '..')
const componentsDir = path.join(baseDir, 'components/src/components')

;(async () => {
  try {
    prompt.start()
    const input = await prompt.get([
      {
        name: 'componentName',
        description: 'Component name',
        type: 'string',
        pattern: /^[A-Z][a-z]+[A-Z]?[a-z]*$/,
        message: 'Component Name must be only letters and pascal case',
        required: true,
      },
      {
        name: 'forwardRef',
        description: 'forwardRef',
        type: 'boolean',
        default: false,
      },
    ])
    const { componentName, forwardRef } = input

    const componentDir = path.join(componentsDir, componentName)
    const exists = fs.existsSync(componentDir)
    if (exists) {
      console.log('Component already exists.')
      return
    }

    // Create directory
    console.log(`Scaffolding <${componentName} />`)
    await fs.mkdirp(componentDir)

    console.log('Creating component...')
    const componentImports = dedent`
      import * as React from 'react'

      import { Box } from '../Box'

      type Props = {}
    `
    const componentBasic = dedent`
      ${componentImports}

      export const ${componentName} = ({ ...props }: Props) => {
        return <Box />
      }
    `
    const componentForwardRef = dedent`
      ${componentImports}

      export const ${componentName} = React.forwardRef(
        ({ ...props }: Props, ref: React.Ref<HTMLElement>) => {
          return <Box ref={ref} />
        }
      )

      ${componentName}.displayName = '${componentName}'
    `
    await fs.writeFile(
      path.join(componentDir, `${componentName}.tsx`),
      forwardRef ? componentForwardRef : componentBasic,
      'utf-8',
    )

    // Write docs file
    console.log('Creating docs...')
    await fs.writeFile(
      path.join(componentDir, `${componentName}.docs.mdx`),
      dedent`
          ---
          title: ${componentName}
          description: Brief component description
          ---

          \`\`\`tsx
          import { ${componentName} } from 'degen'
          \`\`\`

          \`\`\`tsx live=true expand=true
          <${componentName} />
          \`\`\`

          ## Props

          <PropsTable sourceLink={sourceLink} types={types} />
        `,
      'utf-8',
    )

    // Write snippets file
    console.log('Creating snippets...')
    await fs.writeFile(
      path.join(componentDir, `${componentName}.snippets.tsx`),
      dedent`
          import * as React from 'react'

          import { Snippet } from '!/playroom/src/types'
          import { ${componentName} } from './${componentName}'

          export const snippets: Snippet[] = [
            {
              name: 'Basic',
              code: <${componentName} />,
            },
          ]
        `,
      'utf-8',
    )

    // Write test file
    console.log('Creating test...')
    await fs.writeFile(
      path.join(componentDir, `${componentName}.test.tsx`),
      dedent`
          import * as React from 'react'

          import { cleanup, render, screen } from '@/test'

          import { ${componentName} } from './${componentName}'

          describe('<${componentName} />', () => {
            afterEach(cleanup)

            it('renders', () => {
              render(<${componentName} />)
            })
          })
        `,
      'utf-8',
    )

    // Write index file
    console.log('Creating index...')
    const componentIndex = dedent`
      export { ${componentName} } from './${componentName}'
    `
    await fs.writeFile(
      path.join(componentDir, 'index.ts'),
      componentIndex,
      'utf-8',
    )

    // Add to components index
    console.log('Exporting from components...')
    const exports = path.join(componentsDir, 'index.ts')
    const componentsIndex = await fs.readFile(exports, 'utf8')
    const lines = [...componentsIndex.split(/\r?\n/), componentIndex]
      .sort((a, b) => (a > b ? 1 : -1))
      .join('\n')
      .trim()
    await fs.writeFile(exports, lines, 'utf-8')

    console.log('Done.')
  } catch (err) {
    console.log('Exited.')
  }
})()
