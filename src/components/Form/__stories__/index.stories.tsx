import styled from '@emotion/styled'
import { Meta, Story } from '@storybook/react'
import React from 'react'
import {
  CheckboxField,
  Form,
  FormProps,
  RichSelectField,
  Submit,
  SubmitErrorAlert,
  TextBoxField,
} from '../..'
import { emailRegex, mockErrors } from '../../../mocks/mockErrors'

export default {
  component: Form,
  parameters: {
    docs: {
      description: {
        component:
          'This is the main component that is needed to wrap your fields',
      },
    },
  },
  title: 'Components/Form',
} as Meta

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[2]};
`

const Template: Story<FormProps> = ({ errors }) => (
  <Form errors={errors} initialValues={{ receiveEmailUpdates: true }}>
    <Stack>
      <TextBoxField
        name="name"
        label="Name"
        placeholder="John"
        required
        autoComplete="given-name"
      />
      <TextBoxField
        name="email"
        label="Email"
        type="email"
        placeholder="john.smith@email.com"
        required
        regex={[emailRegex]}
      />
      <RichSelectField
        multiple
        name="topics"
        label="Topics "
        placeholder="Select topics you're interested in"
        options={[
          { label: 'React', value: 'react' },
          { label: 'Webdev', value: 'web' },
          { label: 'Cloud', value: 'cloud' },
          { label: 'Devops', value: 'devops' },
        ]}
      />
      <CheckboxField name="receiveEmailUpdates">
        I&apos;d like to receive news updates
      </CheckboxField>
      <SubmitErrorAlert />
      <Submit>Submit</Submit>
    </Stack>
  </Form>
)

Template.args = {
  errors: mockErrors,
  name: 'test-template',
}

export const Default = Template.bind({})

Default.args = {
  ...Template.args,
  name: 'test-default',
}
