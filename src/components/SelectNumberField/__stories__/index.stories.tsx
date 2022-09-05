import { Meta, Story } from '@storybook/react'
import React, { ComponentProps } from 'react'
import SelectNumberField from '..'
import mockErrors from '../../../mocks/mockErrors'
import Form from '../../Form'
import Submit from '../../Submit'

export default {
  component: SelectNumberField,
  decorators: [ChildStory => <Form errors={mockErrors}>{ChildStory()}</Form>],
  parameters: {
    docs: {
      description: {
        component: 'A SelectNumber field',
      },
    },
  },
  title: 'Components/Fields/SelectNumberField',
} as Meta

const Template: Story<ComponentProps<typeof SelectNumberField>> = args => (
  <SelectNumberField {...args} />
)

export const Default = Template.bind({})

Default.args = {
  name: 'default',
}

export const Disabled = Template.bind({})

Disabled.args = {
  ...Template.args,
  disabled: true,
  name: 'disabled',
}

export const Required: Story<
  ComponentProps<typeof SelectNumberField>
> = args => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <SelectNumberField {...args} />
    <Submit>Submit</Submit>
  </div>
)

Required.args = {
  name: 'required',
  required: true,
}
