import { Meta, Story } from '@storybook/react'
import React, { ComponentProps } from 'react'
import { Form, FormProps, RadioField, Submit } from '../..'
import { mockErrors } from '../../../mocks'

export default {
  component: RadioField,
  decorators: [ChildStory => <Form errors={mockErrors}>{ChildStory()}</Form>],
  parameters: {
    docs: {
      description: {
        component: 'A radio field',
      },
      source: { excludeDecorators: true },
    },
  },
  title: 'Components/Fields/RadioField',
} as Meta

const Template: Story<ComponentProps<typeof RadioField>> = args => (
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

export const Required: Story<ComponentProps<typeof RadioField>> = args => (
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
