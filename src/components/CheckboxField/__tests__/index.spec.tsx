import React from 'react'
import CheckboxField from '..'
import { shouldMatchEmotionSnapshotFormWrapper } from '../../../helpers/jestHelpers'

describe('CheckboxField', () => {
  test('should render correctly', () =>
    shouldMatchEmotionSnapshotFormWrapper(<CheckboxField name="test" />))

  test('should render correctly disabled', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <CheckboxField name="test" disabled />,
      {
        transform: node => {
          const input = node.getByRole('checkbox')
          expect(input).toBeDisabled()
        },
      },
    ))
})
