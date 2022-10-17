import { Story } from '@storybook/react'
import { Submit } from '..'
import { mockErrors } from '../../../mocks'
import { Form } from '../../Form'

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
