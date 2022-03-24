import { Meta, Story } from '@storybook/react'
import React, { ComponentProps } from 'react'
import CheckboxField from '..'
import mockErrors from '../../../mocks/mockErrors'
import Form from '../../Form'
import Submit from '../../Submit'

export default {
  component: CheckboxField,
  decorators: [ChildStory => <Form errors={mockErrors}>{ChildStory()}</Form>],
  parameters: {
    docs: {
      description: {
        component: 'A checkbox field',
      },
    },
  },
  title: 'Components/Fields/CheckboxField',
} as Meta

const Template: Story<ComponentProps<typeof CheckboxField>> = args => (
  <CheckboxField {...args}>Checkbox</CheckboxField>
)

export const Default = Template.bind({})

Default.args = {
  name: 'default',
}

export const Checked = Template.bind({})

Checked.args = {
  checked: true,
  name: 'checked',
}

export const Disabled = Template.bind({})

Disabled.args = {
  ...Template.args,
  disabled: true,
  name: 'disabled',
}

export const Required: Story<ComponentProps<typeof CheckboxField>> = args => (
  <>
    <CheckboxField {...args} />
    <div style={{ marginTop: 8 }}>
      <Submit>Submit</Submit>
    </div>
  </>
)

Required.args = {
  name: 'required',
  required: true,
}
