import { Meta, Story } from '@storybook/react'
import React from 'react'
import Submit, { SubmitProps } from '..'
import mockErrors from '../../../mocks/mockErrors'
import Form from '../../Form'

export default {
  component: Submit,
  parameters: {
    docs: {
      description: {
        component: 'Default submit button when no one is provided',
      },
    },
  },
  title: 'Components/Submit',
} as Meta

export const Default: Story<SubmitProps> = ({ children }) => (
  <Form errors={mockErrors}>{() => <Submit>{children}</Submit>}</Form>
)

Default.args = {
  children: 'This form is ready to submit',
}

export const Invalid: Story<SubmitProps> = ({ children }) => (
  <Form errors={mockErrors} validate={() => ({ fake: 'error' })}>
    {() => <Submit>{children}</Submit>}
  </Form>
)

Invalid.args = {
  children: 'This form is invalid',
}

export const Submitting: Story = () => (
  <Form
    errors={mockErrors}
    onSubmit={() =>
      new Promise(resolve => {
        setTimeout(() => resolve(undefined), 5000)
      })
    }
  >
    {({ submitting }) => (
      <Submit>
        {submitting ? 'This form is submitting' : 'Click to submit for 5sec'}
      </Submit>
    )}
  </Form>
)
