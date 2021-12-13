import { Meta, Story } from '@storybook/react'
import React from 'react'
import SwitchField, { SwitchFieldProps } from '..'
import mockErrors from '../../../mocks/mockErrors'
import Form from '../../Form'

export default {
  component: SwitchField,
  decorators: [ChildStory => <Form errors={mockErrors}>{ChildStory()}</Form>],
  parameters: {
    docs: {
      description: {
        component: 'A switch field that act like a checkbox',
      },
    },
  },
  title: 'Components/SwitchField',
} as Meta

const Template: Story<SwitchFieldProps> = args => <SwitchField {...args} />

Template.args = {
  name: 'template',
}

export const Default = Template.bind({})

Default.args = {
  name: 'default',
}

export const Checked = Template.bind({})

Checked.args = {
  initialValue: ['test'],
  name: 'default',
  value: 'test',
}

export const ActAsRadio = Template.bind({})

ActAsRadio.args = {
  initialValue: true,
  name: 'default',
}

export const Disabled = Template.bind({})

Disabled.args = {
  ...Template.args,
  disabled: true,
  name: 'disabled',
}
