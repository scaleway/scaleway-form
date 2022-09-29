import styled from '@emotion/styled'
import { Meta, Story } from '@storybook/react'
import { FORM_ERROR } from 'final-form'
import { ComponentProps } from 'react'
import { Form, Submit, SubmitErrorAlert } from '../..'
import { mockErrors } from '../../../mocks'

export default {
  component: SubmitErrorAlert,
  parameters: {
    docs: {
      description: {
        component:
          'This component is used to display error message after a form submission',
      },
    },
  },
  title: 'Components/SubmitErrorAlert',
} as Meta

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const Default: Story<ComponentProps<typeof SubmitErrorAlert>> = ({
  className,
}) => (
  <Form
    errors={mockErrors}
    onSubmit={() => ({ [FORM_ERROR]: 'An error occured' })}
  >
    <Container>
      <SubmitErrorAlert className={className} />
      <Submit>Click Me</Submit>
    </Container>
  </Form>
)
