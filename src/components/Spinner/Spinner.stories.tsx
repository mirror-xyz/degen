import * as React from 'react'
import { Story } from '@storybook/react'

import { Props, Spinner } from './Spinner'

export default {
  title: 'feedback/Spinner',
  component: Spinner,
}

const Template: Story<Props> = (args) => <Spinner {...args} />

export const Base = Template.bind({})
Base.args = {
  accessibilityLabel: 'Loading',
  size: 'md',
  tone: undefined,
}
