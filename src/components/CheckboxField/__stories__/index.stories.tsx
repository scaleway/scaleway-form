import { Meta, Story } from '@storybook/react'
import React from 'react'
import CheckboxField, { CheckboxFieldProps } from '..'
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
  title: 'Components/CheckboxField',
} as Meta

const Template: Story<CheckboxFieldProps> = args => (
  <CheckboxField {...args}>
    Checkbox
  </CheckboxField>
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

export const Required: Story<CheckboxFieldProps> = args => (
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
