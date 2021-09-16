import * as React from 'react'

import { Snippet } from '~/playroom/types'
import { IconPlusSmall } from '../icons'
import { Button } from './Button'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: <Button>Connect Wallet</Button>,
  },
  {
    name: 'Disabled',
    code: <Button disabled>Connect Wallet</Button>,
  },
  {
    name: 'Loading',
    code: <Button loading>Connect Wallet</Button>,
  },
  {
    name: 'Center',
    code: <Button center>Connect Wallet</Button>,
  },
  {
    name: 'Icon',
    code: <Button icon={<IconPlusSmall />}>Connect Wallet</Button>,
  },
  {
    name: 'Shape',
    code: (
      <Button shape="square">
        <IconPlusSmall />
      </Button>
    ),
  },
  {
    name: 'Size',
    code: <Button size="md">Connect Wallet</Button>,
  },
  {
    name: 'Width',
    code: <Button width="full">Connect Wallet</Button>,
  },
  {
    name: 'With Tone',
    code: <Button tone="green">Connect Wallet</Button>,
  },
]
