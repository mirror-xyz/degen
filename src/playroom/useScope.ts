import { useTheme, vars } from '~/theme'
import { Accent } from '~/tokens'
import { usePlayroomStore } from './PlayroomState'

const useScope = () => {
  const accents: (Accent | 'foreground')[] = [
    'blue',
    'green',
    'indigo',
    'orange',
    'pink',
    'purple',
    'red',
    'teal',
    'yellow',
    'foreground',
  ]
  return {
    vars,
    accents,
    ...useTheme(),
    ...usePlayroomStore(),
  }
}

export default useScope
