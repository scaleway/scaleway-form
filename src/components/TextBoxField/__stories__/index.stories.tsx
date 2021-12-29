import { Meta, Story } from '@storybook/react'
import React from 'react'
import TextBoxField, { TextBoxFieldProps } from '..'
import mockErrors from '../../../mocks/mockErrors'
import Form from '../../Form'
import Submit from '../../Submit'

export default {
  component: TextBoxField,
  decorators: [ChildStory => <Form errors={mockErrors}>{ChildStory()}</Form>],
  parameters: {
    docs: {
      description: {
        component: 'A switch field that act like a checkbox',
      },
    },
  },
  title: 'Components/TextBoxField',
} as Meta

const Template: Story<TextBoxFieldProps> = args => <TextBoxField {...args} />

Template.args = {
  name: 'template',
}

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

export const Required: Story<TextBoxFieldProps> = args => (
  <>
    <TextBoxField {...args} />
    <div style={{ marginTop: 8 }}>
      <Submit>Submit</Submit>
    </div>
  </>
)

Required.args = {
  name: 'required',
  required: true,
}

export const MinMaxLength: Story<TextBoxFieldProps> = args => (
  <>
    <TextBoxField {...args} />
    <div style={{ marginTop: 8 }}>
      <Submit>Submit</Submit>
    </div>
  </>
)

MinMaxLength.args = {
  maxLength: 15,
  minLength: 10,
  name: 'Min/max length',
}

export const Regex: Story<TextBoxFieldProps> = args => (
  <>
    <TextBoxField {...args} />
    <div style={{ marginTop: 8 }}>
      <Submit>Submit</Submit>
    </div>
  </>
)

Regex.args = {
  name: 'Regex',
  regex: 'alpha',
}
