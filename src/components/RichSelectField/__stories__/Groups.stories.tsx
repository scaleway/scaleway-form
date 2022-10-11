import { Story } from '@storybook/react'
import { RichSelectField, RichSelectFieldProps } from '..'

export const Groups: Story<RichSelectFieldProps> = () => (
  <RichSelectField
    name="options"
    options={[
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
    ]}
  />
)
