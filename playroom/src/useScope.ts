import { useTheme } from 'degen/components'
import { vars } from 'degen/css'

import { usePlayroomStore } from './PlayroomState'

const useScope = () => {
  return {
    ...useTheme(),
    ...usePlayroomStore(),
    vars,
  }
}

export default useScope
