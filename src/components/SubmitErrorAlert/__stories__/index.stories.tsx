import styled from '@emotion/styled'
import { Meta, Story } from '@storybook/react'
import { FORM_ERROR } from 'final-form'
import React, { ComponentProps } from 'react'
import SubmitErrorAlert from '..'
import mockErrors from '../../../mocks/mockErrors'
import Form from '../../Form'
import Submit from '../../Submit'

export default {
  component: SubmitErrorAlert,
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
  <Form errors={mockErrors} onSubmit={() => ({ [FORM_ERROR]: 'Not Good' })}>
    <Container>
      <SubmitErrorAlert className={className} />
      <Submit>Click Me</Submit>
    </Container>
  </Form>
)
