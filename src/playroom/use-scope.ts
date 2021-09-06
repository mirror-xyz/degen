import { useTheme } from '~/hooks'

const useScope = () => ({
  theme: useTheme(),
})

export default useScope
