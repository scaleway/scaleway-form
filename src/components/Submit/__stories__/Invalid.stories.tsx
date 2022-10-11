import { Story } from '@storybook/react'
import { Submit } from '..'
import { mockErrors } from '../../../mocks'
import { Form } from '../../Form'

export const Invalid: Story = () => (
  <Form errors={mockErrors} validate={() => ({ fake: 'error' })}>
    <Submit>This form is invalid</Submit>
  </Form>
)
