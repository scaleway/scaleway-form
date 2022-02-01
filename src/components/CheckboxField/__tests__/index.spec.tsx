import userEvent from '@testing-library/user-event'
import React from 'react'
import CheckboxField from '..'
import {
  shouldMatchEmotionSnapshot,
  shouldMatchEmotionSnapshotFormWrapper,
} from '../../../helpers/jestHelpers'
import mockErrors from '../../../mocks/mockErrors'
import Form from '../../Form'

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

  test('should render correctly checked', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <CheckboxField name="checked" checked />,
      {
        transform: node => {
          const input = node.getByRole('checkbox')
          expect(input).toBeChecked()
        },
      },
    ))

  test('should trigger events correctly', () => {
    const onFocus = jest.fn(() => {})
    const onChange = jest.fn(() => {})
    const onBlur = jest.fn(() => {})

    return shouldMatchEmotionSnapshotFormWrapper(
      <CheckboxField
        name="test"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        Checkbox field events
      </CheckboxField>,
      {
        transform: node => {
          const input = node.getByRole('checkbox')
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
        <CheckboxField name="test" required>
          Radio field error
        </CheckboxField>
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

  test('should render correctly checked', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <CheckboxField name="checked" checked />,
      {
        transform: node => {
          const input = node.getByRole('checkbox')
          expect(input).toBeChecked()
        },
      },
    ))
})
