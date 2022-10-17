import { Stack } from '@scaleway/ui'
import { Story } from '@storybook/react'
import { SelectableCardField } from '..'
import { Form, FormProps } from '../../Form'

export const Checked: Story<FormProps> = ({ errors }) => (
  <Form errors={errors} initialValues={{ foo: 'bar' }}>
    <Stack gap={2}>
      <SelectableCardField name="foo" value="bar">
        Radio left
      </SelectableCardField>
      <SelectableCardField name="foo" value="barbar">
        Radio right
      </SelectableCardField>
    </Stack>
  </Form>
)
