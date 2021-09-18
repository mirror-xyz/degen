import * as React from 'react'

import { Box, Button } from '../../../src'
import { CodeBlock } from './CodeBlock'

type Props = {
  default: React.ComponentType
  demoMeta: {
    code: string
    title?: string
    desc?: string
  }
  className?: string
  isDemo: boolean
  style?: React.CSSProperties
}

type State = {
  showCode: boolean
}

const initialState: State = {
  showCode: false,
}

export const Demo = ({ default: DemoComp, demoMeta, isDemo }: Props) => {
  const [state, setState] = React.useState<State>(initialState)

  if (!DemoComp || !demoMeta || !isDemo)
    return (
      <pre>{`Demo Error: <Demo> component receives invalid props.
If you use it in jsx, you should import demos like "import * as demoInfo from './demos/demo.tsx?demo'" and use it like "<Demo {...demoInfo}>"
If you use it in markdown, you should use it exactly like "<Demo src="./demos/demo1.tsx" />" (we use simple regexp to parse it, so you should use this format strictly)
`}</pre>
    )

  const { code } = demoMeta

  return (
    <Box>
      <DemoComp />

      <Button
        onClick={() => setState((x) => ({ ...x, showCode: !x.showCode }))}
      >
        View Code
      </Button>

      {state.showCode && (
        <Box>
          <CodeBlock>{code}</CodeBlock>
        </Box>
      )}
    </Box>
  )
}
