import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import { Form, FormProps, SelectableCardField, Submit } from '../..'
import { mockErrors } from '../../../mocks'

export default {
  component: SelectableCardField,
  decorators: [ChildStory => <Form errors={mockErrors}>{ChildStory()}</Form>],
  parameters: {
    docs: {
      description: {
        component: 'A selectable card field',
      },
      source: { excludeDecorators: true },
    },
  },
  title: 'Components/Fields/SelectableCardField',
} as Meta

const Template: Story<ComponentProps<typeof SelectableCardField>> = args => (
  <SelectableCardField {...args}>Radio</SelectableCardField>
)

export const Default = Template.bind({})

Default.args = {
  name: 'example',
}

export const Checked: Story<FormProps> = ({ errors }) => (
  <Form errors={errors} initialValues={{ foo: 'bar' }}>
    <div style={{ display: 'flex', gap: '16px' }}>
      <SelectableCardField name="foo" value="bar">
        Radio left
      </SelectableCardField>
      <SelectableCardField name="foo" value="barbar">
        Radio right
      </SelectableCardField>
    </div>
  </Form>
)

export const Disabled = Template.bind({})
Disabled.args = {
  ...Template.args,
  disabled: true,
  name: 'disabled',
}

export const Required: Story<
  ComponentProps<typeof SelectableCardField>
> = args => (
  <>
    <SelectableCardField {...args} />
    <div style={{ marginTop: 8 }}>
      <Submit>Submit</Submit>
    </div>
  </>
)
Required.args = {
  children: 'Radio',
  name: 'required',
  required: true,
}
