import { renderHook } from '@testing-library/react-hooks'
import { ValidatorObject } from '../../types'
import useValidation from '../useValidation'

const fakeValidator = (success?: boolean) => ({
  error: 'fake',
  validate: () => success,
})
describe('useValidation', () => {
  test('should render correctly', () => {
    const { result } = renderHook(() => useValidation([] as ValidatorObject[]))
    expect(result.current).toBeDefined()
  })
  test('should call validation', () => {
    const { result } = renderHook(() => useValidation([] as ValidatorObject[]))
    expect(result.current(undefined, {})).toStrictEqual([])
  })

  test('should have one error', () => {
    const { result } = renderHook(() =>
      useValidation([
        fakeValidator(false),
        fakeValidator(true),
      ] as ValidatorObject[]),
    )
    expect(result.current(undefined, {})).toStrictEqual(['fake'])
  })

  test('should have all success', () => {
    const { result } = renderHook(() =>
      useValidation([fakeValidator(true)] as ValidatorObject[]),
    )
    expect(result.current(undefined, {})).toStrictEqual([])
  })
})
