import styled from '@emotion/styled'
import { Meta, Story } from '@storybook/react'
import React, { ComponentProps } from 'react'
import TimeField from '..'
import mockErrors from '../../../mocks/mockErrors'
import Form from '../../Form'
import Submit from '../../Submit'

const Container = styled.div`
  margin-bottom: 300px;
`
export default {
  component: TimeField,
  decorators: [
    ChildStory => (
      <Container>
        <Form errors={mockErrors}>{ChildStory()}</Form>
      </Container>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'TimeField is a component used in Form to pick a date. This component is a Wrapper of DateInput https://github.com/scaleway/scaleway-ui/tree/main/src/components/DateInput',
      },
      source: { excludeDecorators: true },
    },
  },
  title: 'Components/Fields/TimeField',
} as Meta

const Template: Story<ComponentProps<typeof TimeField>> = args => (
  <TimeField {...args} />
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

export const Required: Story<ComponentProps<typeof TimeField>> = args => (
  <>
    <TimeField {...args} />
    <div style={{ marginTop: 8 }}>
      <Submit>Submit</Submit>
    </div>
  </>
)

Required.args = {
  name: 'required',
  required: true,
}
