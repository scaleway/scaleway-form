import { Story } from '@storybook/react'
import { ComponentProps } from 'react'
import { TextBoxField } from '..'

export const Template: Story<ComponentProps<typeof TextBoxField>> = args => (
  <TextBoxField {...args} />
)

Template.args = {
  name: 'template',
}
