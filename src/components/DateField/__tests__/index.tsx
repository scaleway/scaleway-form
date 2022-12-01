import { fireEvent } from '@testing-library/dom'
import { act } from '@testing-library/react'
import { DateField } from '..'
import {
  mockRandom,
  restoreRandom,
  shouldMatchEmotionSnapshotFormWrapper,
} from '../../../helpers/jestHelpers'

describe('DateField', () => {
  beforeAll(mockRandom)

  afterAll(restoreRandom)

  test('should render correctly', () =>
    shouldMatchEmotionSnapshotFormWrapper(<DateField name="test" />))

  test('should render correctly disabled', () =>
    shouldMatchEmotionSnapshotFormWrapper(<DateField name="test" disabled />))

  test('should trigger events', () => {
    const onBlur = jest.fn()
    const onChange = jest.fn()

    return shouldMatchEmotionSnapshotFormWrapper(
      <DateField
        name="test"
        onBlur={onBlur}
        onChange={onChange}
        initialValue={new Date('2022-09-01')}
      />,
      {
        transform: async node => {
          const select = node.getByRole('textbox')
          await act(() => {
            fireEvent.keyDown(select, { key: 'ArrowDown', keyCode: 40 })
          })
          const option = node.getAllByRole('option')[0]
          await act(() => {
            option.click()
          })
          expect(onChange).toBeCalledTimes(1)
          // Blur not working on react-datepicker:
          // https://github.com/Hacker0x01/react-datepicker/issues/2028
          // act(() => {
          //   select.blur()
          // })
          // expect(onBlur).toBeCalledTimes(1)
        },
      },
    )
  })
})
