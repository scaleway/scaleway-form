import React from 'react'
import SwitchField from '..'
import { shouldMatchEmotionSnapshotFormWrapper } from '../../../helpers/jestHelpers'

describe('SwitchField', () => {
  test('should render correctly', () =>
    shouldMatchEmotionSnapshotFormWrapper(<SwitchField name="test" />))

  test('should render correctly disabled', () =>
    shouldMatchEmotionSnapshotFormWrapper(<SwitchField name="test" disabled />))

  test('should render correctly checked', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <SwitchField name="test" value="test" initialValue={['test']} />,
      {
        transform: node => {
          const element = node.getByRole('checkbox') as HTMLInputElement
          expect(element.checked).toBeTruthy()
        },
      },
    ))
  test('should render correctly with onLabel', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <SwitchField name="test" onLabel="Checked" />,
    ))
  test('should render correctly with offLabel', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <SwitchField name="test" onLabel="Not checked" />,
    ))

  test('should render correctly without onLabel and offLabel but has label', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <SwitchField name="test" onLabel="" offLabel="" label="test" />,
    ))

  test('should render correctly with label and checked', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <SwitchField name="test" initialValue label="test" />,
    ))
})
