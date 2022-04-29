import { waitFor } from '@testing-library/dom'
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

  test('should render correctly checked without value', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <CheckboxField name="checked" />,
      {
        transform: async node => {
          const input = node.getByRole('checkbox')
          await waitFor(() => expect(input).toBeChecked())
        },
      },
      {
        initialValues: {
          checked: true,
        },
      },
    ))

  test('should render correctly with a value', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <>
        <CheckboxField name="value" value="foo" />
        <CheckboxField name="value" value="bar" />
      </>,
      {
        transform: node => {
          const inputChecked = node.getByRole('checkbox', { checked: true })
          expect(inputChecked).toBeDefined()
          const inputNotChecked = node.getByRole('checkbox', { checked: false })
          expect(inputNotChecked).toBeDefined()
        },
      },
      {
        initialValues: {
          value: ['bar'],
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
          Checkbox field error
        </CheckboxField>
        <div>Focus</div>
      </Form>,
      {
        transform: async node => {
          await userEvent.click(node.getByRole('checkbox'))
          // to trigger error
          await userEvent.click(node.getByRole('checkbox'))
          await userEvent.click(node.getByText('Focus'))
          const error = node.getByText(mockErrors.REQUIRED as string)
          expect(error).toBeVisible()
        },
      },
    ))
})
