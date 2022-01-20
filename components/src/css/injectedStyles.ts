import { aspectRatioFallback } from './injectedStyles.css'
import { Sprinkles } from './sprinkles.css'

const injectedStyleRules = ['aspectRatio'] as const

export const getInjectedStyleClasses = (rules: Sprinkles): Array<string> => {
  const injectedStyleClasses: Array<string> = []

  for (const rule of injectedStyleRules) {
    switch (rule) {
      case 'aspectRatio': {
        const value = rules[rule]
        if (value && value !== 'auto') {
          injectedStyleClasses.push(aspectRatioFallback({ ratio: value }))
        }
        break
      }
      default: {
        // Ensures a typesafe exhaustive check
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const exhaustiveCheck: never = rule
      }
    }
  }

  return injectedStyleClasses
}
