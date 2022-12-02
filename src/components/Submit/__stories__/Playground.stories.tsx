import { Story } from '@storybook/react'
import { ComponentProps } from 'react'
import { Submit } from '..'
import { mockErrors } from '../../../mocks'
import { Form } from '../../Form'

export const Playground: Story<ComponentProps<typeof Submit>> = ({
  children,
  ...props
}) => (
  <Form onRawSubmit={() => {}} errors={mockErrors}>
    <Submit {...props}>This form is ready to submit</Submit>
  </Form>
)
