import { Story } from '@storybook/react'
import { RadioField } from '..'
import { Form, FormProps } from '../../Form'

export const Checked: Story<FormProps> = ({ errors }) => (
  <Form errors={errors} initialValues={{ foo: 'bar' }}>
    <RadioField name="foo" value="bar">
      Checked Radio
    </RadioField>
  </Form>
)
