import { Story } from '@storybook/react'
import { ComponentProps } from 'react'
import { SelectableCardField } from '..'

export const Template: Story<
  ComponentProps<typeof SelectableCardField>
> = args => <SelectableCardField {...args}>Radio</SelectableCardField>
