import userEvent from '@testing-library/user-event'
import React from 'react'
import RadioBorderedBoxField from '..'
import {
  shouldMatchEmotionSnapshot,
  shouldMatchEmotionSnapshotFormWrapper,
} from '../../../helpers/jestHelpers'
import mockErrors from '../../../mocks/mockErrors'
import Form from '../../Form'

describe('RadioBorderedBoxField', () => {
  test('should render correctly', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <RadioBorderedBoxField name="test" value="test" label="Choice 1">
        Radio field
      </RadioBorderedBoxField>,
    ))

  test('should render correctly disabled', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <RadioBorderedBoxField
        name="test"
        value="disabled"
        label="Choice 1"
        disabled
      >
        Radio field disabled
      </RadioBorderedBoxField>,
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
        <RadioBorderedBoxField name="test" value="checked" label="Choice 1">
          Radio field checked
        </RadioBorderedBoxField>
      </Form>,
      {
        transform: node => {
          const input = node.getByRole('radio')
          expect(input).toBeChecked()
        },
      },
    ))

  test('should trigger events correctly', () => {
    const onFocus = jest.fn(() => {})
    const onChange = jest.fn(() => {})
    const onBlur = jest.fn(() => {})

    return shouldMatchEmotionSnapshotFormWrapper(
      <RadioBorderedBoxField
        name="test"
        label="Choice 1"
        value="events"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        Radio field events
      </RadioBorderedBoxField>,
      {
        transform: node => {
          const input = node.getByRole('radio')
          input.focus()
          expect(onFocus).toBeCalledTimes(1)
          input.click()
          expect(onChange).toBeCalledTimes(1)
          input.blur()
          expect(onBlur).toBeCalledTimes(1)
        },
      },
    )
  })

  test('should render correctly with errors', () =>
    shouldMatchEmotionSnapshot(
      <Form errors={mockErrors}>
        <RadioBorderedBoxField
          name="test"
          value="checked"
          label="Choice 1"
          required
        >
          Radio field error
        </RadioBorderedBoxField>
        <button type="submit">Submit</button>
      </Form>,
      {
        transform: node => {
          userEvent.click(node.getByRole('button'))
          const error = node.getByText(mockErrors.REQUIRED as string)
          expect(error).toBeVisible()
        },
      },
    ))
})
