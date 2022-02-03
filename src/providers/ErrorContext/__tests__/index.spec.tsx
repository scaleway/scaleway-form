import { renderHook } from '@testing-library/react-hooks'
import React, { ReactNode } from 'react'
import ErrorProvider, { useErrors } from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'
import mockErrors from '../../../mocks/mockErrors'

const HookWrapper = ({ children }: { children: ReactNode }) => (
  <ErrorProvider errors={mockErrors}>{children}</ErrorProvider>
)
describe('ErrorProvider', () => {
  test('renders correctly ', () =>
    shouldMatchEmotionSnapshot(
      <ErrorProvider errors={mockErrors}>Test</ErrorProvider>,
    ))
  test('should use context', () => {
    const { result } = renderHook(() => useErrors(), {
      wrapper: HookWrapper,
    })

    expect(result.current.errors).toStrictEqual(mockErrors)
    expect(
      result.current.getFirstError({
        allValues: {},
        label: 'test',
        name: 'test',
        value: 'test',
      }),
    ).toStrictEqual('')
    expect(
      result.current.getFirstError({
        allValues: {},
        label: 'test',
        meta: {
          blur: () => {},
          change: () => {},
          error: ['REQUIRED'],
          focus: () => {},
          name: 'test',
        },
        name: 'test',
        value: '',
      }),
    ).toStrictEqual(mockErrors.REQUIRED)

    expect(
      result.current.getFirstError({
        allValues: {},
        label: 'test',
        meta: {
          blur: () => {},
          change: () => {},
          error: ['MIN_LENGTH'],
          focus: () => {},
          name: 'test',
        },
        minLength: 3,
        name: 'test',
        value: '',
      }),
    ).toEqual('This field should have a length greater than 3')

    const customErrorString = 'This is an error'
    expect(
      result.current.getFirstError({
        allValues: {},
        label: 'test',
        meta: {
          blur: () => {},
          change: () => {},
          error: customErrorString,
          focus: () => {},
          name: 'test',
        },
        minLength: 3,
        name: 'test',
        value: '',
      }),
    ).toEqual(customErrorString)

    // to cover all code branches and default values
    expect(
      result.current.getFirstError({
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
    ).toEqual('')
  })
})
