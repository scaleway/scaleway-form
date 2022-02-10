import { Meta, Story } from '@storybook/react'
import React, { ComponentProps } from 'react'
import StepperField from '..'
import mockErrors from '../../../mocks/mockErrors'
import Form from '../../Form'
import Submit from '../../Submit'

export default {
  component: StepperField,
  decorators: [ChildStory => <Form errors={mockErrors}>{ChildStory()}</Form>],
  parameters: {
    docs: {
      description: {
        component: 'A stepper field',
      },
    },
  },
  title: 'Components/Fields/StepperField',
} as Meta

const Template: Story<ComponentProps<typeof StepperField>> = args => (
  <StepperField {...args} />
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

export const Required: Story<ComponentProps<typeof StepperField>> = args => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <StepperField {...args} />
    <Submit>Submit</Submit>
  </div>
)

Required.args = {
  name: 'required',
  required: true,
}
