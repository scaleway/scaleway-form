import { Story } from '@storybook/react'
import { ComponentProps } from 'react'
import { RadioField } from '..'

export const Template: Story<ComponentProps<typeof RadioField>> = args => (
  <RadioField {...args}>Radio</RadioField>
)
