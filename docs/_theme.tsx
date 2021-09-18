import * as React from 'react'

import { Box } from '../src'
import { createTheme, defaultSideNavs } from './theme'

export default createTheme({
  logo: <Box>hi</Box>,
  sideNavs: (ctx) => {
    return defaultSideNavs(ctx, {
      groupConfig: {
        components: {
          demos: {
            label: 'Demos (dev only)',
            order: -1,
          },
          general: {
            label: 'General',
            order: 1,
          },
          'data-display': {
            label: 'Data Display',
            order: 2,
          },
        },
      },
    })
  },
})
