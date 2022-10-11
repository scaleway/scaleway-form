import { Story } from '@storybook/react'
import { ComponentProps } from 'react'
import { TimeField } from '..'

export const Template: Story<ComponentProps<typeof TimeField>> = args => (
  <TimeField {...args} />
)

Template.args = {
  name: 'template',
}
