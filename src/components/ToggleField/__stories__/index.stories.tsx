import { Meta, Story } from '@storybook/react'
import React, { ComponentProps } from 'react'
import { Form, Submit, ToggleField } from '../..'
import { mockErrors } from '../../../mocks'

export default {
  component: ToggleField,
  decorators: [ChildStory => <Form errors={mockErrors}>{ChildStory()}</Form>],
  parameters: {
    docs: {
      description: {
        component: 'A switch field that act like a checkbox',
      },
      source: { excludeDecorators: true },
    },
  },
  title: 'Components/Fields/ToggleField',
} as Meta

const Template: Story<ComponentProps<typeof ToggleField>> = args => (
  <ToggleField {...args} />
)

Template.args = {
  name: 'template',
}

export const Default = Template.bind({})

Default.args = {
  name: 'default',
}

export const Checked = Template.bind({})

Checked.args = {
  initialValue: ['test'],
  name: 'default',
  value: 'test',
}

export const ActAsRadio = Template.bind({})

ActAsRadio.args = {
  initialValue: true,
  name: 'default',
}

export const Disabled = Template.bind({})

Disabled.args = {
  ...Template.args,
  disabled: true,
  name: 'disabled',
}

export const Required: Story<ComponentProps<typeof ToggleField>> = args => (
  <>
    <ToggleField {...args} />
    <div style={{ marginTop: 8 }}>
      <Submit>Submit</Submit>
    </div>
  </>
)

Required.args = {
  name: 'required',
  required: true,
}
