import { parse as docgen } from 'react-docgen-typescript'
import keyBy from 'lodash/keyBy'
import mapValues from 'lodash/mapValues'

export const getStaticTypes = (pathname: string) => {
  const types = docgen(pathname, {
    propFilter: {
      skipPropsWithName: ['key'],
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
