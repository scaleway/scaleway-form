import React from 'react'
import RichSelectField from '..'
import {
  mockRandom,
  restoreRandom,
  shouldMatchEmotionSnapshotFormWrapper,
} from '../../../helpers/jestHelpers'

describe('RichSelectField', () => {
  beforeAll(mockRandom)

  afterAll(restoreRandom)

  test('should render correctly', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <RichSelectField name="test">
        <RichSelectField.Option value="value" label="Label" />
      </RichSelectField>,
    ))

  test('should render correctly disabled', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <RichSelectField name="test" disabled>
        <RichSelectField.Option value="value" label="Label" />
        <RichSelectField.Option value="value2" label="Label 2" />
      </RichSelectField>,
    ))

  test('should render correctly with a disabled option', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <RichSelectField name="test">
        <RichSelectField.Option value="value" label="Label" />
        <RichSelectField.Option value="value2" label="Label 2" disabled />
      </RichSelectField>,
    ))
})
