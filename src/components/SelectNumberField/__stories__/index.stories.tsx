import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import { Form, SelectNumberField, Submit } from '../..'
import { mockErrors } from '../../../mocks/mockErrors'

export default {
  component: SelectNumberField,
  decorators: [ChildStory => <Form errors={mockErrors}>{ChildStory()}</Form>],
  parameters: {
    docs: {
      description: {
        component: 'A SelectNumber field',
      },
      source: { excludeDecorators: true },
    },
  },
  title: 'Components/Fields/SelectNumberField',
} as Meta

const Template: Story<ComponentProps<typeof SelectNumberField>> = args => (
  <SelectNumberField {...args} />
)

export const Default = Template.bind({})

Default.args = {
  name: 'default',
}

export const Disabled = Template.bind({})

Disabled.args = {
  ...Template.args,
  disabled: true,
  name: 'disabled',
}

export const Required: Story<
  ComponentProps<typeof SelectNumberField>
> = args => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <SelectNumberField {...args} />
    <Submit>Submit</Submit>
  </div>
)

Required.args = {
  name: 'required',
  required: true,
}
