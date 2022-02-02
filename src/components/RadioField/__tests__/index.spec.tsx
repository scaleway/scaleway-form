import React from 'react'
import RadioField from '..'
import {
  shouldMatchEmotionSnapshot,
  shouldMatchEmotionSnapshotFormWrapper,
} from '../../../helpers/jestHelpers'
import mockErrors from '../../../mocks/mockErrors'
import Form from '../../Form'

describe('RadioField', () => {
  test('should render correctly', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <RadioField name="test" value="test">
        Radio field
      </RadioField>,
    ))

  test('should render correctly disabled', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <RadioField name="test" value="disabled" disabled>
        Radio field disabled
      </RadioField>,
      {
        transform: node => {
          const input = node.getByRole('radio')
          expect(input).toBeDisabled()
        },
      },
    ))

  test('should render correctly checked', () =>
    shouldMatchEmotionSnapshot(
      <Form errors={mockErrors} initialValues={{ test: 'checked' }}>
        <RadioField name="test" value="checked">
          Radio field checked
        </RadioField>
      </Form>,
      {
        transform: node => {
          const input = node.getByRole('radio')
          expect(input).toBeChecked()
        },
      },
    ))
})
