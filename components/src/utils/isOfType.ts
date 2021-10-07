import { EmptyObject } from '~/types'

/*
 * Basic generic method for type-guarding
 * https://www.typescriptlang.org/docs/handbook/2/narrowing.html
 */
export const isOfType = <T = EmptyObject>(
  varToBeChecked: any,
  propertyToCheckFor: keyof T | (keyof T)[],
): varToBeChecked is T => {
  const props = varToBeChecked as T
  if (typeof propertyToCheckFor === 'string')
    return props[propertyToCheckFor] !== undefined
  return (propertyToCheckFor as string[]).some(
    (x) => props[x as keyof T] !== undefined,
  )
}
