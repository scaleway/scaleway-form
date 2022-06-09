import { waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import SelectNumberField from '..'
import {
  shouldMatchEmotionSnapshot,
  shouldMatchEmotionSnapshotFormWrapper,
} from '../../../helpers/jestHelpers'
import mockErrors from '../../../mocks/mockErrors'
import Form from '../../Form'

describe('SelectNumberField', () => {
  test('should render correctly', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <SelectNumberField name="test" value={0} />,
    ))

  test('should render correctly disabled', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <SelectNumberField name="test" value={10} disabled />,
      {
        transform: ({ getByLabelText }) => {
          const input = getByLabelText('Input')
          expect(input).toBeDisabled()

          const inputMinus = getByLabelText('Minus')
          expect(inputMinus).toBeDisabled()

          const inputPlus = getByLabelText('Plus')
          expect(inputPlus).toBeDisabled()
        },
      },
    ))

  test.only('should trigger events correctly', () => {
    const onFocus = jest.fn(() => {})
    const onChange = jest.fn(() => {})
    const onBlur = jest.fn(() => {})

    return shouldMatchEmotionSnapshotFormWrapper(
      <SelectNumberField
        name="test"
        value={10}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />,
      {
        transform: ({ getByLabelText }) => {
          const input = getByLabelText('Input')
          input.focus()
          expect(onFocus).toBeCalledTimes(1)
          // clicking inside field should not trigger any change
          input.click()
          expect(onChange).toBeCalledTimes(0)
          input.blur()
          expect(onBlur).toBeCalledTimes(1)
        },
      },
    )
  })

  test('should trigger event onMinCrossed & onMaxCrossed', () => {
    const onMinCrossed = jest.fn(() => {})
    const onMaxCrossed = jest.fn(() => {})
    const minValue = 5
    const maxValue = 20

    return shouldMatchEmotionSnapshot(
      <Form errors={mockErrors}>
        <SelectNumberField
          maxValue={maxValue}
          minValue={minValue}
          name="test"
          onMinCrossed={onMinCrossed}
          onMaxCrossed={onMaxCrossed}
          value={10}
        />
      </Form>,
      {
        transform: async ({ getByLabelText }) => {
          const input = getByLabelText('Input') as HTMLTextAreaElement
          if (input.parentElement) await userEvent.click(input.parentElement)

          // trigger onMinCrossed
          await userEvent.clear(input)
          await userEvent.type(input, '1')
          await waitFor(() => expect(input.value).toBe('1'))
          input.blur()
          await waitFor(() => expect(input.value).toBe('5'))
          expect(onMinCrossed).toBeCalledTimes(1)

          // trigger onMaxCrossed
          await userEvent.clear(input)
          await userEvent.type(input, '100')
          await waitFor(() => expect(input.value).toBe('100'))
          input.blur()
          await waitFor(() => expect(input.value).toBe('20'))
          expect(onMinCrossed).toBeCalledTimes(1)
        },
      },
    )
  })
})
