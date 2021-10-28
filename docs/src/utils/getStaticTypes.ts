import { parse as docgen } from 'react-docgen-typescript'
import keyBy from 'lodash/keyBy'
import mapValues from 'lodash/mapValues'

const allowed = (name: string) => ['ref'].includes(name)

export const getStaticTypes = (pathname: string) => {
  const types = docgen(pathname, {
    propFilter: (prop, _component) => {
      if (allowed(prop.name)) return true
      if (prop.declarations !== undefined && prop.declarations.length > 0) {
        const hasPropAdditionalDescription = prop.declarations.find(
          (declaration) => {
            return !declaration.fileName.includes('node_modules')
          },
        )
        return Boolean(hasPropAdditionalDescription)
      }

      return true
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
