import { Checkbox } from '@scaleway/ui'
import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import { Form, Submit, TextBoxField } from '../..'
import { mockErrors } from '../../../mocks/mockErrors'

export default {
  component: TextBoxField,
  decorators: [ChildStory => <Form errors={mockErrors}>{ChildStory()}</Form>],
  parameters: {
    docs: {
      description: {
        component: 'A switch field that act like a checkbox',
      },
      source: { excludeDecorators: true },
    },
  },
  title: 'Components/Fields/TextBoxField',
} as Meta

const Template: Story<ComponentProps<typeof TextBoxField>> = args => (
  <TextBoxField {...args} />
)

Template.args = {
  name: 'template',
}

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

export const Required: Story<ComponentProps<typeof TextBoxField>> = args => (
  <>
    <TextBoxField {...args} />
    <div style={{ marginTop: 8 }}>
      <Submit>Submit</Submit>
    </div>
  </>
)

Required.args = {
  name: 'required',
  required: true,
}

export const DynamicRequired: Story<
  ComponentProps<typeof TextBoxField>
> = args => {
  const [isRequired, setIsRequired] = React.useState(true)

  return (
    <>
      <Checkbox
        checked={isRequired}
        onChange={() => setIsRequired(!isRequired)}
      >
        Is field required?
      </Checkbox>
      <TextBoxField {...args} required={isRequired} />
      <div style={{ marginTop: 8 }}>
        <Submit>Submit</Submit>
      </div>
    </>
  )
}

DynamicRequired.args = {
  name: 'required',
}

export const MinMaxLength: Story<
  ComponentProps<typeof TextBoxField>
> = args => (
  <>
    <TextBoxField {...args} />
    <div style={{ marginTop: 8 }}>
      <Submit>Submit</Submit>
    </div>
  </>
)

MinMaxLength.args = {
  maxLength: 15,
  minLength: 10,
  name: 'Min/max length',
}

export const Regex: Story<ComponentProps<typeof TextBoxField>> = args => (
  <>
    <TextBoxField {...args} />
    <div style={{ marginTop: 8 }}>
      <Submit>Submit</Submit>
    </div>
  </>
)

Regex.args = {
  name: 'Regex',
  regex: [/^[a-zA-Z]*$/],
}
