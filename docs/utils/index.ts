import { glob } from 'glob'
import { parse as docgen } from 'react-docgen-typescript'
import keyBy from 'lodash/keyBy'
import mapValues from 'lodash/mapValues'

import path from 'path'

export const getComponentPaths = () => {
  const paths = glob.sync('../components/src/components/**/*.docs.mdx', {
    cwd: process.cwd(),
    absolute: true,
  })
  return paths
}

export const getComponentName = (pathname: string) => {
  const componentName = path.basename(pathname, '.mdx')
  return componentName.replace(path.extname(componentName), '')
}

export const getStaticTypes = (pathname: string) => {
  const types = docgen(pathname, {
    propFilter: {
      skipPropsWithName: ['children', 'key'],
    },
    shouldExtractValuesFromUnion: true,
    shouldExtractLiteralValuesFromEnum: true,
    shouldRemoveUndefinedFromOptional: true,
  })
  const typesByDisplayName = keyBy(types, 'displayName')
  const parsedTypes = mapValues(typesByDisplayName, (component) =>
    mapValues(component.props || {}, (prop) => ({
      name: prop.name,
      description: prop.description,
      defaultValue: prop.defaultValue,
      required: prop.required,
      type: prop.type,
    })),
  )
  return parsedTypes
}
