import { useTheme } from '~/components'

const useScope = () => ({
  theme: useTheme(),
})

export default useScope
