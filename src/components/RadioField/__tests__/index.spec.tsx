import React from 'react'
import RadioField from '..'
import { shouldMatchEmotionSnapshotFormWrapper } from '../../../helpers/jestHelpers'

describe('RadioField', () => {
  test('should render correctly', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <RadioField name="test" value="test" />,
    ))

  test('should render correctly disabled', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <RadioField name="test" value="disabled" disabled />,
      {
        transform: node => {
          const input = node.getByRole('radio')
          expect(input).toBeDisabled()
        },
      },
    ))

  test('should render correctly checked', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <RadioField value="checked" name="checked" checked />,
      {
        transform: node => {
          const input = node.getByRole('radio')
          expect(input).toBeChecked()
        },
      },
    ))
})
