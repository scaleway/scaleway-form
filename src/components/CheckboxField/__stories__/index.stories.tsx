import { Meta, Story } from '@storybook/react'
import React, { ComponentProps } from 'react'
import { CheckboxField, Form, FormProps, Submit } from '../..'
import { mockErrors } from '../../../mocks'

export default {
  component: CheckboxField,
  decorators: [ChildStory => <Form errors={mockErrors}>{ChildStory()}</Form>],
  parameters: {
    docs: {
      description: {
        component: 'A checkbox field',
      },
      source: { excludeDecorators: true },
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

export const Checked: Story<FormProps> = ({ errors }) => (
  <Form errors={errors} initialValues={{ foo: ['bar'] }}>
    <CheckboxField name="foo" value="bar">
      Checked Item
    </CheckboxField>
    <CheckboxField name="foo" value="nope">
      Not Checked Item
    </CheckboxField>
  </Form>
)

export const BooleanChecked: Story<FormProps> = ({ errors }) => (
  <Form errors={errors} initialValues={{ foo: true }}>
    <CheckboxField name="foo">Default Checked Boolean Item</CheckboxField>
  </Form>
)

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
