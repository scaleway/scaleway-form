import regex from '../regex'

describe('regex validator', () => {
  test('should not throw error', () => {
    const validator = regex('alpha')
    expect(validator).toBeDefined()
    expect(validator.error).toBe('REGEX')
  })

  test('should throw error', () => {
    // @ts-expect-error It should throw an error
    expect(() => regex('test')).toThrowError('regex should be one of these')
  })

  test('should success', () => {
    const validator = regex('alpha')
    expect(validator.validate('test', {})).toBe(true)
  })

  test('should failed', () => {
    const validator = regex('alpha')
    expect(validator.validate('a1', {})).toBe(false)
    expect(validator.validate('a+', {})).toBe(false)
  })
})
