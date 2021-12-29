import max from '../max'

describe('max validator', () => {
  test('should not throw error', () => {
    const validator = max(1)
    expect(validator).toBeDefined()
    expect(validator.error).toBe('TOO_HIGH')
  })

  test('should throw error', () => {
    // @ts-expect-error It should throw an error
    expect(() => max('test')).toThrowError(
      'max validator should receive a number',
    )
  })

  test('should success', () => {
    const validator = max(1)
    expect(validator.validate(2, {})).toBe(false)
    expect(validator.validate(5, {})).toBe(false)
  })

  test('should failed', () => {
    const validator = max(10)
    expect(validator.validate(1, {})).toBe(true)
    expect(validator.validate(9, {})).toBe(true)
    expect(validator.validate(10, {})).toBe(false)
    expect(validator.validate(-10, {})).toBe(true)
    expect(validator.validate(-11, {})).toBe(true)
  })
})
