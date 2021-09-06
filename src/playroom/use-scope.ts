import { useTheme } from '~/hooks'

const useScope = () => ({
  click: () => alert('Nice click :)'),
  theme: useTheme(),
})

export default useScope
