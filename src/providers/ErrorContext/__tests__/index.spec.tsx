import { renderHook } from '@testing-library/react'
import React, { ReactNode } from 'react'
import { Form as ReactFinalForm } from 'react-final-form'
import ErrorProvider, { useErrors } from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'
import mockErrors from '../../../mocks/mockErrors'

const HookWrapper = ({ children }: { children: ReactNode }) => (
  <ReactFinalForm
    onSubmit={jest.fn()}
    render={() => <ErrorProvider errors={mockErrors}>{children}</ErrorProvider>}
  />
)
describe('ErrorProvider', () => {
  test('renders correctly ', () =>
    shouldMatchEmotionSnapshot(
      <ReactFinalForm
        onSubmit={jest.fn()}
        render={() => <ErrorProvider errors={mockErrors}>Test</ErrorProvider>}
      />,
    ))
  test('should use context', () => {
    const { result } = renderHook(() => useErrors(), {
      wrapper: HookWrapper,
    })

    expect(result.current.errors).toStrictEqual(mockErrors)
    expect(
      result.current.getError({
        label: 'test',
        name: 'test',
        value: 'test',
      }),
    ).toStrictEqual(undefined)
    expect(
      result.current.getError({
        label: 'test',
        meta: {
          blur: () => {},
          change: () => {},
          error: ['REQUIRED'],
          focus: () => {},
          name: 'test',
          touched: true,
        },
        name: 'test',
        value: '',
      }),
    ).toStrictEqual(mockErrors.REQUIRED)

    expect(
      result.current.getError({
        allValues: {},
        label: 'test',
        meta: {
          blur: () => {},
          change: () => {},
          error: ['MIN_LENGTH'],
          focus: () => {},
          name: 'test',
          touched: true,
        },
        minLength: 3,
        name: 'test',
        value: '',
      }),
    ).toEqual('This field should have a length greater than 3')

    const customErrorString = 'This is an error'
    expect(
      result.current.getError({
        allValues: {},
        label: 'test',
        meta: {
          blur: () => {},
          change: () => {},
          error: customErrorString,
          focus: () => {},
          name: 'test',
          touched: true,
        },
        minLength: 3,
        name: 'test',
        value: '',
      }),
    ).toEqual(customErrorString)

    // to cover all code branches and default values
    expect(
      result.current.getError({
        allValues: {},
        label: 'test',
        meta: {
          blur: () => {},
          change: () => {},
          error: [],
          focus: () => {},
          name: 'test',
        },
        minLength: 3,
        name: 'test',
        value: '',
      }),
    ).toEqual(undefined)
  })
})
