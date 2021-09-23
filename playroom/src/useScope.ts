import { useTheme } from '~/components'
import { usePlayroomStore } from './PlayroomState'

const useScope = () => {
  return {
    ...useTheme(),
    ...usePlayroomStore(),
  }
}

export default useScope
