import { Story } from '@storybook/react'
import { CheckboxField } from '..'
import { Form, FormProps } from '../../Form'

export const BooleanChecked: Story<FormProps> = ({ errors }) => (
  <Form onRawSubmit={() => {}} errors={errors} initialValues={{ foo: true }}>
    <CheckboxField name="foo">Default Checked Boolean Item</CheckboxField>
  </Form>
)
