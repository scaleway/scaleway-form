import { Stack } from '@scaleway/ui'
import { Story } from '@storybook/react'
import { ComponentProps } from 'react'
import { SelectableCardField } from '..'
import { Submit } from '../../Submit'

export const Required: Story<
  ComponentProps<typeof SelectableCardField>
> = args => (
  <Stack gap={1}>
    <SelectableCardField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)
Required.args = {
  children: 'Radio',
  name: 'required',
  required: true,
}
