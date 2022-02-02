import React from 'react'
import RadioField from '..'
import { shouldMatchEmotionSnapshotFormWrapper } from '../../../helpers/jestHelpers'

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
})
