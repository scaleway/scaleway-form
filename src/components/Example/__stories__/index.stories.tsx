import { Meta, Story } from '@storybook/react'
import React from 'react'
import Example from '..'

export default {
  component: Example,
  title: 'Components/Example',
} as Meta

const Template: Story = () => <Example />

export const Default = Template.bind({})
