import { Meta, Story } from '@storybook/react'
import React from 'react'
import Form, { FormProps } from '..'
import mockErrors from '../../../mocks/mockErrors'

export default {
  component: Form,
  parameters: {
    docs: {
      description: {
        component: 'This is the main component that need to wrap your fields',
      },
    },
  },
  title: 'Components/Form',
} as Meta

const Template: Story<FormProps> = ({ errors, children }) => (
  <Form errors={errors}>{children}</Form>
)

Template.args = {
  children: () => "I'm inside a form component",
  errors: mockErrors,
  name: 'test-template',
}

export const Default = Template.bind({})

Default.args = {
  ...Template.args,
  name: 'test-default',
}
