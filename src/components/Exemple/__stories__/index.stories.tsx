import { Meta, Story } from '@storybook/react'
import React from 'react'
import Exemple from '..'

export default {
  component: Exemple,
  title: 'Components/Exemple',
} as Meta

const Template: Story = () => <Exemple />

export const Default = Template.bind({})
