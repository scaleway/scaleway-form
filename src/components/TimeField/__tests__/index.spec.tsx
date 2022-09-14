import { fireEvent, waitFor } from '@testing-library/dom'
import { act } from '@testing-library/react'
import React from 'react'
import { TimeField } from '..'
import {
  mockRandom,
  restoreRandom,
  shouldMatchEmotionSnapshotFormWrapper,
} from '../../../helpers/jestHelpers'

describe('TimeField', () => {
  beforeAll(mockRandom)

  afterAll(restoreRandom)

  test('should render correctly', () =>
    shouldMatchEmotionSnapshotFormWrapper(<TimeField name="test" />))

  test('should render correctly disabled', () =>
    shouldMatchEmotionSnapshotFormWrapper(<TimeField name="test" disabled />))

  test('should render correctly checked without value', () =>
    shouldMatchEmotionSnapshotFormWrapper(<TimeField name="test" />, {
      transform: async node => {
        const input = node.getByRole('combobox')
        await waitFor(() => expect(input).toHaveAttribute('value', ''))
      },
    }))

  test('should trigger events', () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()
    const onFocus = jest.fn()

    return shouldMatchEmotionSnapshotFormWrapper(
      <TimeField
        name="test"
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        options={[
          { label: '01:00', value: '01:00' },
          { label: '02:00', value: '02:00' },
        ]}
      />,
      {
        transform: node => {
          const select = node.getByRole('combobox')
          act(() => {
            select.focus()
          })
          expect(onFocus).toBeCalledTimes(1)
          act(() => {
            fireEvent.keyDown(select, { key: 'ArrowDown', keyCode: 40 })
          })
          const option = node.getByTestId('option--01:00')
            .firstChild as HTMLElement
          act(() => {
            option.click()
          })
          expect(onChange).toBeCalledTimes(1)
          act(() => {
            select.blur()
          })
          expect(onBlur).toBeCalledTimes(1)
        },
      },
    )
  })
})
