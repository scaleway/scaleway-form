import React from 'react'
import TextBoxField from '..'
import { shouldMatchEmotionSnapshotFormWrapper } from '../../../helpers/jestHelpers'

describe('TextBoxField', () => {
  test('should render correctly', () =>
    shouldMatchEmotionSnapshotFormWrapper(<TextBoxField name="test" />))

  test('should render correctly disabled', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <TextBoxField name="test" disabled />,
    ))
})
