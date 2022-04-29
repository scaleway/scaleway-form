import userEvent from '@testing-library/user-event'
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

  test('should trigger events correctly', () => {
    const onFocus = jest.fn(() => {})
    const onChange = jest.fn(() => {})
    const onBlur = jest.fn(() => {})

    return shouldMatchEmotionSnapshotFormWrapper(
      <RadioField
        name="test"
        value="events"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        Radio field events
      </RadioField>,
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
        <RadioField name="test" value="checked" required>
          Radio field error
        </RadioField>
        <button type="submit">Submit</button>
      </Form>,
      {
        transform: async node => {
          await userEvent.click(node.getByRole('button'))
          const error = node.getByText(mockErrors.REQUIRED as string)
          expect(error).toBeVisible()
        },
      },
    ))
})
