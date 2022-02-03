import { Meta, Story } from '@storybook/react'
import React from 'react'
import RadioField, { RadioFieldProps } from '..'
import mockErrors from '../../../mocks/mockErrors'
import Form, { FormProps } from '../../Form'
import Submit from '../../Submit'

export default {
  component: RadioField,
  decorators: [ChildStory => <Form errors={mockErrors}>{ChildStory()}</Form>],
  parameters: {
    docs: {
      description: {
        component: 'A radio field',
      },
    },
  },
  title: 'Components/RadioField',
} as Meta

const Template: Story<RadioFieldProps> = args => (
  <RadioField {...args}>Radio</RadioField>
)

export const Default = Template.bind({})

Default.args = {
  name: 'default',
}

export const Checked: Story<FormProps> = ({ errors }) => (
  <Form errors={errors} initialValues={{ foo: 'bar' }}>
    <RadioField name="foo" value="bar">
      Checked Radio
    </RadioField>
  </Form>
)

export const Disabled = Template.bind({})

Disabled.args = {
  ...Template.args,
  disabled: true,
  name: 'disabled',
}

export const Required: Story<RadioFieldProps> = args => (
  <>
    <RadioField {...args} />
    <div style={{ marginTop: 8 }}>
      <Submit>Submit</Submit>
    </div>
  </>
)

Required.args = {
  name: 'required',
  required: true,
}
