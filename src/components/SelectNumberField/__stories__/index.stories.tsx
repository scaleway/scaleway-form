import type { Meta } from '@storybook/react'
import { Form, SelectNumberField } from '../..'
import { mockErrors } from '../../../mocks/mockErrors'

export default {
  component: SelectNumberField,
  decorators: [
    ChildStory => (
      <Form onRawSubmit={() => {}} errors={mockErrors}>
        {ChildStory()}
      </Form>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: 'A SelectNumber field',
      },
    },
  },
  title: 'Components/Fields/SelectNumberField',
} as Meta

export { Playground } from './Playground.stories'
export { Disabled } from './Disabled.stories'
export { Required } from './Required.stories'
