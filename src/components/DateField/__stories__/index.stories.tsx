import styled from '@emotion/styled'
import { Meta, Story } from '@storybook/react'
import React, { ComponentProps } from 'react'
import DateField from '..'
import mockErrors from '../../../mocks/mockErrors'
import Form from '../../Form'
import Submit from '../../Submit'
import TimeField from '../../TimeField'

const Container = styled.div`
  margin-bottom: 300px;
`
export default {
  component: DateField,
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
          'DateField is a component used in Form to pick a date. This component is a Wrapper of DateInput https://github.com/scaleway/scaleway-ui/tree/main/src/components/DateInput',
      },
    },
  },
  title: 'Components/Fields/DateField',
} as Meta

const Template: Story<ComponentProps<typeof DateField>> = args => (
  <DateField {...args} />
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

export const Required: Story<ComponentProps<typeof DateField>> = args => (
  <>
    <DateField {...args} />
    <div style={{ marginTop: 8 }}>
      <Submit>Submit</Submit>
    </div>
  </>
)

Required.args = {
  name: 'required',
  required: true,
}

export const MinMaxDate: Story<ComponentProps<typeof DateField>> = args => (
  <>
    <DateField {...args} />
    <div style={{ marginTop: 8 }}>
      <Submit>Submit</Submit>
    </div>
  </>
)

MinMaxDate.args = {
  maxDate: new Date('2021-12-31'),
  minDate: new Date('2021-01-01'),
  name: 'date',
  required: true,
}

const now = new Date()

export const MinMaxDateWithTimeField: Story<
  ComponentProps<typeof DateField>
> = ({ name, minDate, maxDate, required }) => (
  <>
    <DateField
      name={name}
      minDate={minDate}
      initialValue={now}
      maxDate={maxDate}
      required={required}
    />
    <div style={{ marginTop: 8 }}>
      <TimeField name={name} />
    </div>
    <div style={{ marginTop: 8 }}>
      <Submit>Submit</Submit>
    </div>
  </>
)

MinMaxDateWithTimeField.args = {
  maxDate: new Date(),
  name: 'date and input',
  required: true,
}
