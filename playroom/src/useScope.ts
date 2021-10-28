import { useTheme } from 'degen/components'

import { usePlayroomStore } from './PlayroomState'

const useScope = () => {
  return {
    ...useTheme(),
    ...usePlayroomStore(),
  }
}

export default useScope
