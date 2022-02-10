import { Meta, Story } from '@storybook/react'
import React from 'react'
import TagsField, { TagsFieldProps } from '..'
import mockErrors from '../../../mocks/mockErrors'
import Form from '../../Form'

export default {
  component: TagsField,
  decorators: [ChildStory => <Form errors={mockErrors}>{ChildStory()}</Form>],
  parameters: {
    docs: {
      description: {
        component: 'A tags field',
      },
    },
  },
  title: 'Components/Fields/TagsField',
} as Meta

const Template: Story<TagsFieldProps> = args => <TagsField {...args} />

export const Default = Template.bind({})

Default.args = {
  name: 'default',
}

export const Placeholder = Template.bind({})

Placeholder.args = {
  ...Template.args,
  name: 'placeholder',
  placeholder: 'Placeholder',
}

export const Disabled = Template.bind({})

Disabled.args = {
  ...Template.args,
  disabled: true,
  name: 'disabled',
}

export const DefaultTags = Template.bind({})

DefaultTags.args = {
  ...Template.args,
  name: 'defaultTags',
  tags: ['tag1', 'tag2'],
}
