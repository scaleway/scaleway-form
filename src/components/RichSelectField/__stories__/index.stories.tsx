import { Meta, Story } from '@storybook/react'
import React from 'react'
import RichSelectField, { RichSelectFieldProps } from '..'
import mockErrors from '../../../mocks/mockErrors'
import Form from '../../Form'

export default {
  component: RichSelectField,
  decorators: [ChildStory => <Form errors={mockErrors}>{ChildStory()}</Form>],
  parameters: {
    docs: {
      description: {
        component: 'A rich select field',
      },
    },
  },
  title: 'Components/Fields/RichSelectField',
} as Meta

const Template: Story<RichSelectFieldProps> = args => (
  <RichSelectField {...args}>
    <RichSelectField.Option value="value">Label</RichSelectField.Option>
    <RichSelectField.Option value="value2">Label 2</RichSelectField.Option>
  </RichSelectField>
)

export const Default = Template.bind({})

Default.args = {
  name: 'default',
}

const TemplateGroupsOptions: Story<RichSelectFieldProps> = args => (
  <RichSelectField {...args} />
)

export const Groups = TemplateGroupsOpions.bind({})

Groups.args = {
  name: 'options',
  options: [
    {
      label: 'option1',
      options: [
        {
          label: 'AA',
          value: 'AA',
        },
        {
          label: 'AB',
          value: 'AB',
        },
        {
          label: 'AC',
          value: 'AC',
        },
      ],
    },
    {
      label: 'option2',
      options: [
        {
          label: 'BA',
          value: 'BA',
        },
        {
          label: 'BB',
          value: 'BB',
        },
        {
          label: 'BC',
          value: 'BC',
        },
      ],
    },
  ],
}
