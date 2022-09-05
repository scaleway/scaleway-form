import { Meta, Story } from '@storybook/react'
import React, { ComponentProps } from 'react'
import RadioBorderedBoxField from '..'
import mockErrors from '../../../mocks/mockErrors'
import Form, { FormProps } from '../../Form'
import Submit from '../../Submit'

export default {
  component: RadioBorderedBoxField,
  decorators: [ChildStory => <Form errors={mockErrors}>{ChildStory()}</Form>],
  parameters: {
    docs: {
      description: {
        component: 'A radio field',
      },
    },
  },
  title: 'Components/Fields/RadioBorderedBoxField',
} as Meta

const Template: Story<ComponentProps<typeof RadioBorderedBoxField>> = args => (
  <RadioBorderedBoxField {...args}>Radio</RadioBorderedBoxField>
)

export const Default = Template.bind({})

Default.args = {
  label: 'Choice 1',
  name: 'default',
}

export const Checked: Story<FormProps> = ({ errors }) => (
  <Form errors={errors} initialValues={{ foo: 'bar' }}>
    <RadioBorderedBoxField label="Choice 1" name="foo" value="bar">
      Checked Radio
    </RadioBorderedBoxField>
  </Form>
)

export const Disabled = Template.bind({})

Disabled.args = {
  ...Template.args,
  disabled: true,
  label: 'Choice 1',
  name: 'disabled',
}

export const Required: Story<
  ComponentProps<typeof RadioBorderedBoxField>
> = args => (
  <>
    <RadioBorderedBoxField {...args} />
    <div style={{ marginTop: 8 }}>
      <Submit>Submit</Submit>
    </div>
  </>
)

Required.args = {
  label: 'Choice 1',
  name: 'required',
  required: true,
}
