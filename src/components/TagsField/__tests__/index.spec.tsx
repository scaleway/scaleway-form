import React from 'react'
import TagsField from '..'
import { shouldMatchEmotionSnapshotFormWrapper } from '../../../helpers/jestHelpers'

describe('SwitchField', () => {
  test('should render correctly', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <TagsField name="test" placeholder="placeholder" />,
    ))

  test('should render correctly disabled', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <TagsField name="test-disabled" placeholder="placeholder" disabled />,
    ))

  test('should render correctly with default tags', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <TagsField
        name="test-tags"
        placeholder="placeholder"
        tags={['tags-1', 'tags-2']}
      />,
    ))
})
