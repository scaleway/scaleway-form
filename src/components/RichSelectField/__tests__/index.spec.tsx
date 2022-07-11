import { fireEvent } from '@testing-library/dom'
import { act } from '@testing-library/react'
import React from 'react'
import RichSelectField from '..'
import {
  mockRandom,
  renderWithWrapper,
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

  test('should render correctly multiple', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <RichSelectField name="test" multiple>
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

  test('should use custom format', () => {
    const format = jest.fn()
    const rendered = renderWithWrapper(
      <RichSelectField name="test" format={format} formatOnBlur>
        <RichSelectField.Option value="value" label="Label" />
        <RichSelectField.Option value="value2" label="Label 2" />
      </RichSelectField>,
    )
    act(() => {
      rendered.getByRole('combobox').focus()
      rendered.getByRole('combobox').blur()
    })
    expect(format).toHaveBeenNthCalledWith(1, '', 'test')
  })

  test('should use custom format on grouped options', () => {
    const format = jest.fn()
    const rendered = renderWithWrapper(
      <RichSelectField
        name="test"
        format={format}
        formatOnBlur
        options={[
          {
            label: 'Group',
            options: [
              { label: 'Label', value: 'value' },
              { label: 'Label 2', value: 'value2' },
            ],
          },
        ]}
      />,
    )
    act(() => {
      rendered.getByRole('combobox').focus()
      rendered.getByRole('combobox').blur()
    })
    expect(format).toBeCalledTimes(1)
  })

  test('should display right value on grouped options', () => {
    const selectedOption = { label: 'Group Label', value: 'Group Value' }
    const options = [
      {
        label: 'Group',
        options: [
          selectedOption,
          { label: 'Group Label 2', value: 'Group value2' },
        ],
      },
    ]

    return shouldMatchEmotionSnapshotFormWrapper(
      <RichSelectField name="test" options={options} />,
      {
        transform: ({ getByRole, getByTestId, container }) => {
          const select = getByRole('combobox') as HTMLInputElement
          act(() => {
            select.focus()
          })
          act(() => {
            fireEvent.keyDown(select, { key: 'ArrowDown', keyCode: 40 })
          })
          const option = getByTestId(`option-test-${selectedOption.value}`)
            .firstChild as HTMLElement

          act(() => {
            option.click()
          })

          // react-select works with a hidden input to handle value.
          const hiddenSelectInput = container.querySelector(
            'input[type="hidden"]',
          ) as HTMLInputElement

          const {value} = hiddenSelectInput
          expect(value).toBe(selectedOption.value)
        },
      },
    )
  })

  test('should trigger events', () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()
    const onFocus = jest.fn()

    return shouldMatchEmotionSnapshotFormWrapper(
      <RichSelectField
        name="test"
        options={[
          { label: 'Label', value: 'value' },
          { label: 'Label 2', value: 'value2' },
        ]}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
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
          const option = node.getByTestId('option-test-value')
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
