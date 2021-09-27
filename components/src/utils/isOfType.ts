/*
 * Basic generic method for type-guarding
 * https://www.typescriptlang.org/docs/handbook/2/narrowing.html
 */
export const isOfType = <T>(
  varToBeChecked: any,
  propertyToCheckFor: keyof T,
): varToBeChecked is T =>
  (varToBeChecked as T)[propertyToCheckFor] !== undefined
