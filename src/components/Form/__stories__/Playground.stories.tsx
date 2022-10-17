import { Stack } from '@scaleway/ui'
import { ComponentStory } from '@storybook/react'
import {
  CheckboxField,
  Form,
  RichSelectField,
  Submit,
  SubmitErrorAlert,
  TextBoxField,
} from '../..'
import { emailRegex, mockErrors } from '../../../mocks/mockErrors'

export const Playground: ComponentStory<typeof Form> = args => (
  <Form {...args}>
    <Stack gap={2}>
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
        noTopLabel
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

Playground.args = {
  errors: mockErrors,
  initialValues: { receiveEmailUpdates: true },
}
